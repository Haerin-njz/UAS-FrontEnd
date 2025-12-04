-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  seat_id INTEGER NOT NULL,
  price REAL NOT NULL,
  ticket_code TEXT UNIQUE,
  status TEXT DEFAULT 'active',
  scanned_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY(seat_id) REFERENCES seats(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_tickets_booking ON tickets(booking_id);
CREATE INDEX IF NOT EXISTS idx_tickets_seat ON tickets(seat_id);
CREATE INDEX IF NOT EXISTS idx_tickets_code ON tickets(ticket_code);
