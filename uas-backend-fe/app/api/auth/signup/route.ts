import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateToken } from '@/lib/auth';
import { createUser, getUserByEmail } from '@/lib/db-helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, full_name, phone_number } = body;

    console.log('Sign up request:', { email, full_name });

    // Validasi input
    if (!email || !password || !full_name) {
      console.warn('Validation failed: missing fields');
      return NextResponse.json(
        { error: 'Email, password, dan full_name diperlukan' },
        { status: 400 }
      );
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Validation failed: invalid email format');
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Validasi password strength
    if (password.length < 6) {
      console.warn('Validation failed: password too short');
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    console.log('Checking if email already exists...');
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.warn('Email already registered:', email);
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await hashPassword(password);

    // Buat user baru
    console.log('Creating user in database...');
    const userId = await createUser(email, hashedPassword, full_name, phone_number);
    console.log('User created successfully with ID:', userId);

    // Generate token
    const token = generateToken(userId, email);

    return NextResponse.json(
      {
        message: 'Registrasi berhasil',
        token,
        user: {
          id: userId,
          email,
          full_name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi', details: String(error) },
      { status: 500 }
    );
  }
}
