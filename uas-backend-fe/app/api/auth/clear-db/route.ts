import { getAllUsers } from '@/lib/db-helpers';
import db from '@/db/database';

export async function DELETE() {
    try {
        return new Promise((resolve) => {
            db.run('DELETE FROM users', (err) => {
                if (err) {
                    resolve(
                        new Response(
                            JSON.stringify({ success: false, error: 'Gagal menghapus database' }),
                            { status: 500, headers: { 'Content-Type': 'application/json' } }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({ success: true, message: 'Semua data user berhasil dihapus' }),
                            { status: 200, headers: { 'Content-Type': 'application/json' } }
                        )
                    );
                }
            });
        });
    } catch (error) {
        console.error('Clear DB Error:', error);
        return new Response(
            JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
