import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// GET /api/admin/projects - 프로젝트 목록 (관리자용)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || !(await isAdmin(decoded.userId, prisma))) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year');
    const category = searchParams.get('category');
    const isPublic = searchParams.get('isPublic');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (year) {
      const yearNum = parseInt(year);
      if (!isNaN(yearNum)) {
        where.year = yearNum;
      }
    }

    if (category) {
      where.category = category;
    }

    if (isPublic === 'true') {
      where.isPublic = true;
    } else if (isPublic === 'false') {
      where.isPublic = false;
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                nickname: true,
                profileImage: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.project.count({ where });

    return NextResponse.json(
      {
        projects,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로젝트 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '프로젝트 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects - 프로젝트 생성
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || !(await isAdmin(decoded.userId, prisma))) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // Content-Type 확인하여 FormData 또는 JSON 처리
    const contentType = request.headers.get('content-type') || '';
    let title: string;
    let description: string | null = null;
    let teamName: string | null = null;
    let year: string;
    let category: string | null = null;
    let tagsJson: string | null = null;
    let isPublicStr: string | null = null;
    let memberIdsJson: string | null = null;
    let coverImage: File | null = null;
    let detailImages: File[] = [];

    if (contentType.includes('multipart/form-data')) {
      // FormData 처리
      const formData = await request.formData();
      
      title = formData.get('title') as string;
      description = formData.get('description') as string | null;
      teamName = formData.get('teamName') as string | null;
      year = formData.get('year') as string;
      category = formData.get('category') as string | null;
      tagsJson = formData.get('tags') as string | null;
      isPublicStr = formData.get('isPublic') as string | null;
      memberIdsJson = formData.get('memberIds') as string | null;
      
      // 이미지 파일 추출
      const coverImageFile = formData.get('coverImage') as File | null;
      if (coverImageFile && coverImageFile.size > 0) {
        // 파일 크기 검증
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (coverImageFile.size > maxSize) {
          return NextResponse.json(
            { error: '표지 이미지 크기는 5MB 이하여야 합니다.' },
            { status: 400 }
          );
        }
        coverImage = coverImageFile;
      }
      
      const detailImagesFiles = formData.getAll('detailImages') as File[];
      detailImages = detailImagesFiles.filter((file) => file && file.size > 0);
      
      // 세부 이미지 크기 검증
      const maxSize = 5 * 1024 * 1024; // 5MB
      for (const image of detailImages) {
        if (image.size > maxSize) {
          return NextResponse.json(
            { error: `${image.name}의 크기는 5MB 이하여야 합니다.` },
            { status: 400 }
          );
        }
      }
    } else {
      // JSON 처리 (기존 방식 지원)
      const body = await request.json();
      title = body.title;
      description = body.description || null;
      teamName = body.teamName || null;
      year = body.year;
      category = body.category || null;
      tagsJson = body.tags ? JSON.stringify(body.tags) : null;
      isPublicStr = body.isPublic !== undefined ? String(body.isPublic) : null;
    }

    if (!title || !year) {
      return NextResponse.json(
        { error: '제목과 연도는 필수입니다.' },
        { status: 400 }
      );
    }

    let thumbnailUrl: string | null = null;
    let contentUrls: string[] = [];

    // 표지 이미지 업로드
    if (coverImage) {
      try {
        const bytes = await coverImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = coverImage.name.split('.').pop() || 'jpg';
        const timestamp = Date.now();
        const fileName = `project_cover_${decoded.userId}_${timestamp}.${fileExtension}`;
        
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects');
        await mkdir(uploadDir, { recursive: true });
        
        const filePath = join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        
        thumbnailUrl = `/uploads/projects/${fileName}`;
      } catch (error) {
        console.error('표지 이미지 업로드 오류:', error);
        return NextResponse.json(
          { error: '표지 이미지 업로드 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 세부내용 이미지들 업로드
    if (detailImages && detailImages.length > 0) {
      try {
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects');
        await mkdir(uploadDir, { recursive: true });
        
        const timestamp = Date.now();
        for (let i = 0; i < detailImages.length; i++) {
          const image = detailImages[i];
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileExtension = image.name.split('.').pop() || 'jpg';
          const fileName = `project_detail_${decoded.userId}_${timestamp}_${i}.${fileExtension}`;
          
          const filePath = join(uploadDir, fileName);
          await writeFile(filePath, buffer);
          
          contentUrls.push(`/uploads/projects/${fileName}`);
        }
      } catch (error) {
        console.error('세부 이미지 업로드 오류:', error);
        return NextResponse.json(
          { error: '세부 이미지 업로드 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 태그 파싱
    let tags: string[] = [];
    if (tagsJson) {
      try {
        tags = JSON.parse(tagsJson);
      } catch (e) {
        console.error('태그 파싱 오류:', e);
      }
    }

    // isPublic 파싱
    const isPublic = isPublicStr !== null ? isPublicStr === 'true' : true;

    // content를 JSON 문자열로 저장 (이미지 URL 배열)
    const content = contentUrls.length > 0 ? JSON.stringify(contentUrls) : null;

    // memberIds 파싱
    let memberIds: string[] = [];
    if (memberIdsJson) {
      try {
        memberIds = JSON.parse(memberIdsJson);
      } catch (e) {
        console.error('memberIds 파싱 오류:', e);
      }
    }

    // 프로젝트 생성
    const project = await prisma.project.create({
      data: {
        title,
        description: description || null,
        teamName: teamName || null,
        year: parseInt(year),
        category: category || null,
        thumbnail: thumbnailUrl,
        content: content,
        isPublic: isPublic,
        tags: tags.length > 0 ? {
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        } : undefined,
        members: memberIds.length > 0 ? {
          create: memberIds.map((userId: string) => ({
            user: {
              connect: { id: userId },
            },
          })),
        } : undefined,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                nickname: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: '프로젝트가 생성되었습니다.',
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('프로젝트 생성 오류:', error);
    return NextResponse.json(
      { error: '프로젝트 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
