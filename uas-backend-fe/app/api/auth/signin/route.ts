import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';
import { getUserByEmail } from '@/lib/db-helpers';
import { db } from '@/db/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password diperlukan' },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Ambil password dari database
    const userWithPassword = await new Promise<{ password: string } | undefined>((resolve, reject) => {
      db.get('SELECT password FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        resolve(row as { password: string } | undefined);
      });
    });

    if (!userWithPassword) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Validasi password
    const passwordMatch = await comparePassword(password, userWithPassword.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.id, user.email);

    return NextResponse.json(
      {
        message: 'Login berhasil',
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone_number: user.phone_number,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
