import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/database';

function runAll(sql: string, params: any[] = []) {
  return new Promise<any[]>((resolve, reject) => {
    db.all(sql, params, (err: Error | null, rows: any[]) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

function runGet(sql: string, params: any[] = []) {
  return new Promise<any>((resolve, reject) => {
    db.get(sql, params, (err: Error | null, row: any) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get('pageSize')) || 10));
    const status = url.searchParams.get('status');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    const where: string[] = [];
    const params: any[] = [];
    if (status) { where.push('status = ?'); params.push(status); }
    if (from) { where.push('created_at >= ?'); params.push(from); }
    if (to) { where.push('created_at <= ?'); params.push(to); }

    const whereSql = where.length ? ('WHERE ' + where.join(' AND ')) : '';

    const countRow: any = await runGet(`SELECT COUNT(*) as cnt FROM payments ${whereSql}`, params);
    const total = (countRow && countRow.cnt) ? Number(countRow.cnt) : 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const offset = (page - 1) * pageSize;
    const rows = await runAll(
      `SELECT id, booking_id, provider, provider_reference, amount, currency, status, paid_at, created_at FROM payments ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      params.concat([pageSize, offset])
    );

    return NextResponse.json({ page, pageSize, total, totalPages, data: rows });
  } catch (err) {
    console.error('Payments list error:', err);
    return NextResponse.json({ error: 'Failed to fetch payments', details: String(err) }, { status: 500 });
  }
}
