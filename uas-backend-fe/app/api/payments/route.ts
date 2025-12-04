import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/database';

function runSql(sql: string, params: any[] = []): Promise<{ lastID?: number; changes?: number }> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (this: any, err: Error | null) {
      if (err) return reject(err);
      resolve({ lastID: this?.lastID, changes: this?.changes });
    });
  });
}

function getRow<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err: Error | null, row: T) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookingId = Number(body.booking_id);
    const provider = body.provider || null;
    const providerRef = body.provider_reference || null;
    const amount = Number(body.amount) || 0;
    const currency = body.currency || 'IDR';
    const status = body.status || 'pending'; // pending|paid|failed
    const paidAt = body.paid_at || null; // ISO string or null

    if (!bookingId) {
      return NextResponse.json({ error: 'booking_id is required' }, { status: 400 });
    }

    // ensure booking exists
    const booking: any = await getRow('SELECT id, status FROM bookings WHERE id = ?', [bookingId]);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    try {
      await runSql('BEGIN TRANSACTION');

      const insertSql = `INSERT INTO payments (booking_id, provider, provider_reference, amount, currency, status, paid_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`;
      const res = await runSql(insertSql, [bookingId, provider, providerRef, amount, currency, status, paidAt]);
      const paymentId = res.lastID;

      // If payment successful, mark booking as confirmed/paid
      if (String(status).toLowerCase() === 'paid') {
        await runSql('UPDATE bookings SET status = ? WHERE id = ?', ['confirmed', bookingId]);
      }

      await runSql('COMMIT');

      return NextResponse.json({ success: true, payment_id: paymentId });
    } catch (txErr) {
      try { await runSql('ROLLBACK'); } catch { /* ignore */ }
      console.error('Payment transaction failed:', txErr);
      return NextResponse.json({ error: 'Failed to record payment', details: String(txErr) }, { status: 500 });
    }
  } catch (err) {
    console.error('Payments POST error:', err);
    return NextResponse.json({ error: 'Invalid request', details: String(err) }, { status: 400 });
  }
}
