import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/database';

// Helper wrappers around sqlite3 callbacks
function runSql(sql: string, params: any[] = []): Promise<{ lastID?: number; changes?: number }> {
  return new Promise((resolve, reject) => {
    // use function to access `this.lastID`
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
    const userId: number | null = body.user_id ?? null;
    const screeningId = Number(body.screening_id);
    const seatIds: number[] = Array.isArray(body.seat_ids) ? body.seat_ids.map((s: any) => Number(s)) : [];
    const totalAmount = Number(body.total_amount) || 0;

    if (!screeningId || seatIds.length === 0) {
      return NextResponse.json({ error: 'screening_id and seat_ids are required' }, { status: 400 });
    }

    // Check availability for each seat: no existing active ticket for same screening and not cancelled booking
    for (const seatId of seatIds) {
      const ticketRow: any = await getRow(
        `SELECT COUNT(*) as cnt FROM tickets t JOIN bookings b ON t.booking_id = b.id WHERE t.seat_id = ? AND b.screening_id = ? AND b.status != 'cancelled'`,
        [seatId, screeningId]
      );
      const lockedRow: any = await getRow(
        `SELECT COUNT(*) as cnt FROM seat_locks WHERE screening_id = ? AND seat_id = ? AND (expires_at IS NULL OR expires_at > datetime('now'))`,
        [screeningId, seatId]
      );

      const ticketCnt = ticketRow && (ticketRow.cnt ?? ticketRow.count ?? 0);
      const lockCnt = lockedRow && (lockedRow.cnt ?? lockedRow.count ?? 0);
      if (Number(ticketCnt) > 0 || Number(lockCnt) > 0) {
        return NextResponse.json({ error: `Seat ${seatId} is already reserved`, code: 'seat_unavailable' }, { status: 409 });
      }
    }

    // All seats available — create booking + tickets in transaction
    const expiresMinutes = 15;
    const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000).toISOString();

    try {
      await runSql('BEGIN TRANSACTION');

      const insertBookingSql = `INSERT INTO bookings (user_id, screening_id, status, total_amount, number_of_seats, expires_at) VALUES (?, ?, 'pending', ?, ?, ?)`;
      const bookingRes = await runSql(insertBookingSql, [userId, screeningId, totalAmount, seatIds.length, expiresAt]);
      const bookingId = bookingRes.lastID as number;

      // price per seat (fallback to 0 when seat count 0)
      const pricePerSeat = seatIds.length ? Math.round((totalAmount || 0) / seatIds.length) : 0;

      for (const seatId of seatIds) {
        const ticketCode = `TKT-${Date.now()}-${seatId}-${Math.floor(Math.random() * 9000 + 1000)}`;
        await runSql(
          `INSERT INTO tickets (booking_id, seat_id, price, ticket_code, status, created_at) VALUES (?, ?, ?, ?, 'active', datetime('now'))`,
          [bookingId, seatId, pricePerSeat, ticketCode]
        );
      }

      await runSql('COMMIT');

      return NextResponse.json({ success: true, booking_id: bookingId });
    } catch (txErr) {
      try { await runSql('ROLLBACK'); } catch { /* ignore */ }
      console.error('Booking transaction failed:', txErr);
      return NextResponse.json({ error: 'Failed to create booking', details: String(txErr) }, { status: 500 });
    }
  } catch (err) {
    console.error('Bookings POST error:', err);
    return NextResponse.json({ error: 'Invalid request', details: String(err) }, { status: 400 });
  }
}
