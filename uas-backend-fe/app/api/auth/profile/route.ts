import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '@/lib/middleware';
import { getUserById } from '@/lib/db-helpers';

export async function GET(request: NextRequest) {
  try {
    const decoded = middleware(request);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token tidak valid atau tidak ditemukan' },
        { status: 401 }
      );
    }

    const user = await getUserById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
