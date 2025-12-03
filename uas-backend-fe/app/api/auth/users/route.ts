import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/db-helpers';

// Tambahkan delay untuk pastikan database sudah siap
const waitForDb = () => new Promise(resolve => setTimeout(resolve, 500));

export async function GET(request: NextRequest) {
  try {
    // Tunggu database siap
    await waitForDb();

    const users = await getAllUsers();

    return NextResponse.json(
      {
        message: 'Data semua user',
        count: users.length,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data user', details: String(error) },
      { status: 500 }
    );
  }
}
