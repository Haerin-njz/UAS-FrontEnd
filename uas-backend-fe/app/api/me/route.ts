import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple /api/me endpoint.
 * It reads cookies "userName" and "userEmail" from the incoming request and returns them.
 * Use this from client to detect logged-in user (works with HttpOnly cookies because server reads them).
 */
export async function GET(req: NextRequest) {
  try {
    const nameCookie = req.cookies.get('userName')?.value || null;
    const emailCookie = req.cookies.get('userEmail')?.value || null;

    if (!nameCookie && !emailCookie) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      name: nameCookie,
      email: emailCookie
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'internal error' }, { status: 500 });
  }
}
