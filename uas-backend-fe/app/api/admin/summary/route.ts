import '@/app/api/auth/init';
import { NextResponse } from 'next/server';
import { db } from '@/db/database';
import { films as hardcodedFilms } from '@/lib/films';
import path from 'path';
import Database from 'better-sqlite3';

// Run a query and return rows; if the table doesn't exist or query errors, return [] (don't fail entire summary)
async function allRows(sql: string) {
  return new Promise<Array<Record<string, unknown>>>((resolve) => {
    db.all(sql, (err: Error | null, rows: Array<Record<string, unknown>> | undefined) => {
      if (err) {
        console.warn('Query failed, returning empty set for:', sql, String(err));
        return resolve([]);
      }
      resolve(rows || []);
    });
  });
}

export async function GET() {
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

    // If movies table is empty or absent, fallback to hardcoded films
    let finalMovies = movies;
    if ((!finalMovies || finalMovies.length === 0) && hardcodedFilms && hardcodedFilms.length) {
      finalMovies = hardcodedFilms.map((f, idx) => ({ id: idx + 1, title: f.title, duration_minutes: f.duration, genre: f.genre }));
    }

    // Also read payments from `data/db.sqlite` (orders/payments stored by frontend)
    let externalPayments: Array<Record<string, any>> = [];
    try {
      const dataDbPath = path.join(process.cwd(), 'data', 'db.sqlite');
      const dataDb = new Database(dataDbPath, { readonly: true });
      // data/db.sqlite has payments with columns: id, order_id, method, provider, amount, status, details, created_at
      const rows = dataDb.prepare('SELECT id, order_id, method, provider, amount, status, details, created_at FROM payments ORDER BY id DESC').all();
      externalPayments = (rows || []).map((r: any) => ({
        id: r.id,
        booking_id: null,
        provider: r.provider || r.method || null,
        provider_reference: (r.details && typeof r.details === 'string') ? null : null,
        amount: Number(r.amount) || 0,
        currency: 'IDR',
        status: r.status || null,
        paid_at: null,
        created_at: r.created_at || null,
        // keep original raw for debug
        _source: 'data_db',
        _raw: r,
      }));
      dataDb.close();
    } catch (e) {
      console.warn('Failed to read payments from data/db.sqlite:', String(e));
    }

    // Simple aggregate metrics
    const cinemaPayments = (payments || []).map((p: any) => ({ ...p, _source: 'cinema_db' }));
    const allPayments = cinemaPayments.concat(externalPayments);
    const revenue = allPayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

    return NextResponse.json({
      message: 'Admin summary',
      timestamp: new Date().toISOString(),
      totals: {
        users: (users || []).length,
        movies: (finalMovies || []).length,
        screenings: (screenings || []).length,
        auditoriums: (auditoriums || []).length,
        seats: (seats || []).length,
        bookings: (bookings || []).length,
        tickets: (tickets || []).length,
        payments: allPayments.length,
        seat_locks: (seat_locks || []).length,
        promotions: (promotions || []).length,
        revenue,
      },
      users,
      movies: finalMovies,
      screenings,
      auditoriums,
      seats,
      bookings,
      tickets,
      payments: allPayments,
      seat_locks,
      promotions,
    });
  } catch (error) {
    console.error('Admin summary error (unexpected):', error);
    return NextResponse.json({ error: 'Failed to fetch admin summary', details: String(error) }, { status: 500 });
  }
}
