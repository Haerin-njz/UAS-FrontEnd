import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { runMigrations } from './migrate';

const dbDir = path.join(process.cwd(), 'db');
const dbPath = path.join(dbDir, 'cinema.db');

// Ensure db directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create database synchronously
const dbSync = new sqlite3.Database(dbPath);

// Initialize tables synchronously
dbSync.serialize(() => {
  // Create users table
  dbSync.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone_number TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err: Error | null) => {
    if (err) {
      console.error('❌ Error creating users table:', err.message);
    } else {
      console.log('✓ Users table ready');
    }
  });

  // Create transactions table
  dbSync.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      film_id INTEGER,
      amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `, (err: Error | null) => {
    if (err) {
      console.error('❌ Error creating transactions table:', err.message);
    } else {
      console.log('✓ Transactions table ready');
    }
  });

  // Run migrations for ticketing system
  runMigrations().then(() => {
    console.log('✅ Ticketing schema migrations complete');
  }).catch((err) => {
    console.error('❌ Migration error:', err);
  });
});

console.log('✅ Database initialized at:', dbPath);

export { dbSync as db };
export default dbSync;
