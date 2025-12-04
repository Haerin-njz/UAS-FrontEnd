import '@/app/api/auth/init';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/database';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  return new Promise(async (resolve) => {
    db.run('DELETE FROM seat_locks WHERE id = ?', [id], function(err: Error | null) {
      if (err) {
        console.error('Failed to delete seat_lock:', err);
        resolve(NextResponse.json({ error: 'Failed to delete seat_lock' }, { status: 500 }));
        return;
      }

      if (this.changes && this.changes > 0) {
        resolve(NextResponse.json({ success: true }));
      } else {
        resolve(NextResponse.json({ error: 'Not found' }, { status: 404 }));
      }
    });
  });
}
