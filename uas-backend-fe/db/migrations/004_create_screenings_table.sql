-- Create screenings table
CREATE TABLE IF NOT EXISTS screenings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  movie_id INTEGER NOT NULL,
  auditorium_id INTEGER NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT,
  base_price REAL NOT NULL DEFAULT 0,
  language TEXT,
  format TEXT,
  available_seats INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY(auditorium_id) REFERENCES auditoriums(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_screenings_movie ON screenings(movie_id);
CREATE INDEX IF NOT EXISTS idx_screenings_auditorium ON screenings(auditorium_id);
CREATE INDEX IF NOT EXISTS idx_screenings_start_time ON screenings(start_time);
