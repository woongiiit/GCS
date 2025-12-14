import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/items - 전체 품목 목록
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
    const search = searchParams.get('search'); // 상품번호, 상품명 검색
    const type = searchParams.get('type'); // "fund" | "partner"
    const status = searchParams.get('status'); // "판매 중" | "품절"
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (status === '판매 중') {
      where.status = 'active';
    } else if (status === '품절') {
      where.status = 'soldout';
    }

    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        options: {
          include: {
            values: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.product.count({ where });

    // 품목 형식으로 변환
    type ItemType = {
      id: string;
      productId: string;
      productName: string;
      type: string;
      optionName: string | null;
      optionValue: string | null;
      price: number;
      status: string;
      teamName: string;
    };

    const items: ItemType[] = products.flatMap((product): ItemType[] => {
      if (product.options.length === 0) {
        // 옵션이 없는 경우
        return [
          {
            id: `${product.id}-default`,
            productId: product.id,
            productName: product.name,
            type: product.type,
            optionName: null,
            optionValue: null,
            price: 0, // 기본 가격 (옵션별 가격은 옵션에 있음)
            status: product.status,
            teamName: product.team.name,
          },
        ];
      } else {
        // 옵션이 있는 경우 각 옵션값별로 품목 생성
        return product.options.flatMap((option): ItemType[] =>
          option.values.map((value): ItemType => ({
            id: `${product.id}-${option.id}-${value.id}`,
            productId: product.id,
            productName: product.name,
            type: product.type,
            optionName: option.name,
            optionValue: value.value,
            price: value.price || 0,
            status: product.status,
            teamName: product.team.name,
          }))
        );
      }
    });

    return NextResponse.json(
      {
        items,
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
    console.error('전체 품목 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '전체 품목 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
