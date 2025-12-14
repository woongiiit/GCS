import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects/[id] - 프로젝트 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    // 비공개 프로젝트 체크
    if (!project.isPublic) {
      // TODO: 관리자 권한 체크 추가
      return NextResponse.json(
        { error: '비공개 프로젝트입니다.' },
        { status: 403 }
      );
    }

    // 조회수 증가
    prisma.project.update({
      where: { id: projectId },
      data: { viewCount: { increment: 1 } },
    }).catch(err => console.error('조회수 증가 오류:', err));

    // 디버깅: members 데이터 확인
    console.log('프로젝트 멤버 데이터:', {
      membersCount: project.members.length,
      members: project.members.map((pm) => ({
        projectMemberId: pm.id,
        userId: pm.userId,
        hasUser: !!pm.user,
        userName: pm.user?.name,
      })),
    });

    return NextResponse.json(
      {
        project: {
          id: project.id,
          title: project.title,
          description: project.description,
          teamName: project.teamName,
          year: project.year,
          category: project.category,
          thumbnail: project.thumbnail,
          content: project.content,
          viewCount: project.viewCount,
          tags: project.tags.map((pt) => pt.tag.name),
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          members: project.members
            .filter((pm) => pm.user) // user가 존재하는 경우만 필터링
            .map((pm) => ({
              id: pm.user!.id,
              name: pm.user!.name,
              nickname: pm.user!.nickname,
              profileImage: pm.user!.profileImage,
            })),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로젝트 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '프로젝트 상세 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
