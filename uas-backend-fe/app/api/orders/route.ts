import { NextRequest, NextResponse } from 'next/server';
// fix: correct relative path to lib/db.ts
import { createOrder, listOrders } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { film, poster, date, name, email, quantity, paymentMethod, payment } = body;

    if (!name || !email || !quantity) {
      return NextResponse.json({ error: 'name, email and quantity are required' }, { status: 400 });
    }

    const orderId = `ORD-${Date.now()}`;

    createOrder({
      order_id: orderId,
      film,
      poster,
      date,
      name,
      email,
      quantity: Number(quantity),
      status: 'created',
      payment: payment ? { method: paymentMethod || 'unknown', provider: payment.provider, amount: payment.amount, status: payment.status || 'pending', details: payment.details } : undefined,
    });

    return NextResponse.json({ success: true, order_id: orderId }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'internal error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email') || undefined;
    const rows = listOrders(email);
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'internal error' }, { status: 500 });
  }
}
