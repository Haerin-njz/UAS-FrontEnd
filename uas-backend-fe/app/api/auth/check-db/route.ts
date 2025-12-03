import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/db-helpers';

export async function GET(request: NextRequest) {
  try {
    const users = await getAllUsers();

    return NextResponse.json(
      {
        message: '📊 Database Check',
        timestamp: new Date().toISOString(),
        total_users: users.length,
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone_number: user.phone_number,
          created_at: user.created_at,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database check error:', error);
    return NextResponse.json(
      { error: 'Failed to check database', details: String(error) },
      { status: 500 }
    );
  }
}
