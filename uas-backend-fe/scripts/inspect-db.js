#!/usr/bin/env node
/* eslint-disable */
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'db.sqlite');
if (!fs.existsSync(dbPath)) {
  console.error('DB file not found:', dbPath);
  process.exit(1);
}

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Failed to open DB:', err);
    process.exit(1);
  }
  console.log('DB:', dbPath);

  db.all("PRAGMA table_info('payments')", (err, rows) => {
    console.log('\nPRAGMA table_info(payments):');
    if (err) console.error(err); else console.log(rows);

    db.all("PRAGMA table_info('bookings')", (err2, rows2) => {
      console.log('\nPRAGMA table_info(bookings):');
      if (err2) console.error(err2); else console.log(rows2);

      db.all("SELECT type,name,sql FROM sqlite_master WHERE name LIKE 'payments' OR name LIKE 'bookings' OR name LIKE 'idx_payments_%' OR name LIKE 'idx_tickets_%'", (err3, rows3) => {
        console.log('\nsqlite_master (tables/indexes):');
        if (err3) console.error(err3); else console.log(rows3);
        db.close();
      });
    });
  });
});
