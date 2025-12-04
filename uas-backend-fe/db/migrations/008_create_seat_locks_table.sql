-- Create seat_locks table
CREATE TABLE IF NOT EXISTS seat_locks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  screening_id INTEGER NOT NULL,
  seat_id INTEGER NOT NULL,
  locked_by TEXT,
  locked_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(screening_id) REFERENCES screenings(id) ON DELETE CASCADE,
  FOREIGN KEY(seat_id) REFERENCES seats(id) ON DELETE CASCADE,
  UNIQUE(screening_id, seat_id)
);

CREATE INDEX IF NOT EXISTS idx_seat_locks_screening ON seat_locks(screening_id);
CREATE INDEX IF NOT EXISTS idx_seat_locks_expires ON seat_locks(expires_at);
