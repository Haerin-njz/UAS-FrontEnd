-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  auditorium_id INTEGER NOT NULL,
  row TEXT NOT NULL,
  seat_number INTEGER NOT NULL,
  seat_code TEXT UNIQUE,
  seat_type TEXT DEFAULT 'regular',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(auditorium_id) REFERENCES auditoriums(id) ON DELETE CASCADE,
  UNIQUE(auditorium_id, row, seat_number)
);

CREATE INDEX IF NOT EXISTS idx_seats_auditorium ON seats(auditorium_id);
CREATE INDEX IF NOT EXISTS idx_seats_code ON seats(seat_code);
