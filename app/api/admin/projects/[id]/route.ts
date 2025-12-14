import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

// GET /api/admin/projects/[id] - 프로젝트 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const projectId = params.id;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
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

    if (!project) {
      return NextResponse.json(
        { error: '프로젝트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('프로젝트 조회 오류:', error);
    return NextResponse.json(
      { error: '프로젝트 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/projects/[id] - 프로젝트 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const projectId = params.id;
    
    // Content-Type 확인하여 FormData 또는 JSON 처리
    const contentType = request.headers.get('content-type') || '';
    let title: string | undefined;
    let description: string | null | undefined;
    let teamName: string | null | undefined;
    let year: string | undefined;
    let category: string | null | undefined;
    let tagsJson: string | null | undefined;
    let isPublicStr: string | null | undefined;
    let memberIdsJson: string | null | undefined;
    let coverImage: File | null = null;
    let detailImages: File[] = [];

    if (contentType.includes('multipart/form-data')) {
      // FormData 처리
      const formData = await request.formData();
      
      title = formData.get('title') as string | undefined;
      description = formData.get('description') as string | null | undefined;
      teamName = formData.get('teamName') as string | null | undefined;
      year = formData.get('year') as string | undefined;
      category = formData.get('category') as string | null | undefined;
      tagsJson = formData.get('tags') as string | null | undefined;
      isPublicStr = formData.get('isPublic') as string | null | undefined;
      memberIdsJson = formData.get('memberIds') as string | null | undefined;
      
      // 이미지 파일 추출
      const coverImageFile = formData.get('coverImage') as File | null;
      if (coverImageFile && coverImageFile.size > 0) {
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
      // JSON 처리
      const body = await request.json();
      title = body.title;
      description = body.description;
      teamName = body.teamName;
      year = body.year;
      category = body.category;
      tagsJson = body.tags ? JSON.stringify(body.tags) : null;
      isPublicStr = body.isPublic !== undefined ? String(body.isPublic) : null;
    }

    // 기존 프로젝트 조회
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: '프로젝트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (teamName !== undefined) updateData.teamName = teamName;
    if (year !== undefined) updateData.year = parseInt(year);
    if (category !== undefined) updateData.category = category;
    if (isPublicStr !== undefined) updateData.isPublic = isPublicStr === 'true';

    let thumbnailUrl: string | null | undefined = undefined;
    let contentUrls: string[] | undefined = undefined;

    // 표지 이미지 업로드
    if (coverImage) {
      try {
        // 기존 이미지 삭제 (있는 경우)
        if (existingProject.thumbnail) {
          try {
            const oldImagePath = join(process.cwd(), 'public', existingProject.thumbnail);
            await unlink(oldImagePath);
          } catch (e) {
            // 파일이 없으면 무시
          }
        }

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
        updateData.thumbnail = thumbnailUrl;
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
        // 기존 이미지들 삭제 (있는 경우)
        if (existingProject.content) {
          try {
            const existingUrls = JSON.parse(existingProject.content);
            for (const url of existingUrls) {
              try {
                const oldImagePath = join(process.cwd(), 'public', url);
                await unlink(oldImagePath);
              } catch (e) {
                // 파일이 없으면 무시
              }
            }
          } catch (e) {
            // JSON 파싱 실패 시 무시
          }
        }

        const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects');
        await mkdir(uploadDir, { recursive: true });
        
        const timestamp = Date.now();
        const newUrls: string[] = [];
        for (let i = 0; i < detailImages.length; i++) {
          const image = detailImages[i];
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileExtension = image.name.split('.').pop() || 'jpg';
          const fileName = `project_detail_${decoded.userId}_${timestamp}_${i}.${fileExtension}`;
          
          const filePath = join(uploadDir, fileName);
          await writeFile(filePath, buffer);
          
          newUrls.push(`/uploads/projects/${fileName}`);
        }
        contentUrls = newUrls;
        updateData.content = JSON.stringify(contentUrls);
      } catch (error) {
        console.error('세부 이미지 업로드 오류:', error);
        return NextResponse.json(
          { error: '세부 이미지 업로드 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 태그 처리
    if (tagsJson !== undefined) {
      // 기존 태그 삭제
      await prisma.projectTag.deleteMany({
        where: { projectId },
      });

      // 새 태그 추가
      if (tagsJson) {
        try {
          const tags = JSON.parse(tagsJson);
          if (tags.length > 0) {
            updateData.tags = {
              create: tags.map((tagName: string) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tagName },
                    create: { name: tagName },
                  },
                },
              })),
            };
          }
        } catch (e) {
          console.error('태그 파싱 오류:', e);
        }
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
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
        message: '프로젝트가 수정되었습니다.',
        project: updatedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로젝트 수정 오류:', error);
    return NextResponse.json(
      { error: '프로젝트 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects/[id] - 프로젝트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const projectId = params.id;

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json(
      {
        message: '프로젝트가 삭제되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로젝트 삭제 오류:', error);
    return NextResponse.json(
      { error: '프로젝트 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
