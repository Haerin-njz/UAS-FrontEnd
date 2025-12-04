import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/database';

async function allRows(sql: string) {
  return new Promise<any[]>((resolve, reject) => {
    db.all(sql, (err: Error | null, rows: any[]) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

export async function GET(request: NextRequest) {
  try {
    const [users, movies, screenings, auditoriums, seats, bookings, tickets, payments, seat_locks, promotions] = await Promise.all([
      allRows('SELECT id, email, full_name, phone_number, created_at FROM users'),
      allRows('SELECT id, title, duration_minutes, genre, release_date FROM movies'),
      allRows('SELECT id, movie_id, auditorium_id, start_time, end_time, base_price, available_seats FROM screenings'),
      allRows('SELECT id, name, total_seats FROM auditoriums'),
      allRows('SELECT id, auditorium_id, row, seat_number, seat_type, seat_code FROM seats'),
      allRows('SELECT id, user_id, screening_id, status, total_amount, number_of_seats, reserved_at, expires_at, created_at FROM bookings'),
      allRows('SELECT id, booking_id, seat_id, price, ticket_code, status, created_at FROM tickets'),
      allRows('SELECT id, booking_id, provider, provider_reference, amount, currency, status, paid_at, created_at FROM payments'),
      allRows('SELECT id, screening_id, seat_id, locked_by, locked_at, expires_at FROM seat_locks'),
      allRows('SELECT id, code, description, discount_percent, discount_amount, valid_from, valid_to, active FROM promotions'),
    ]);

    // Simple aggregate metrics
    const revenue = payments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

    return NextResponse.json({
      message: 'Admin summary',
      timestamp: new Date().toISOString(),
      totals: {
        users: users.length,
        movies: movies.length,
        screenings: screenings.length,
        auditoriums: auditoriums.length,
        seats: seats.length,
        bookings: bookings.length,
        tickets: tickets.length,
        payments: payments.length,
        seat_locks: seat_locks.length,
        promotions: promotions.length,
        revenue,
      },
      users,
      movies,
      screenings,
      auditoriums,
      seats,
      bookings,
      tickets,
      payments,
      seat_locks,
      promotions,
    });
  } catch (error) {
    console.error('Admin summary error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin summary', details: String(error) }, { status: 500 });
  }
}
