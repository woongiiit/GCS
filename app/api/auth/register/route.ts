import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/db';
import { registerSchema } from '@/lib/validations/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다.' },
        { status: 400 }
      );
    }
    
    const { email, name, password, nickname, phone } = result.data;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      );
    }

    const existingNickname = await prisma.user.findUnique({
      where: { nickname },
    });

    if (existingNickname) {
      return NextResponse.json(
        { error: '이미 사용 중인 닉네임입니다.' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        nickname,
        phone,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
