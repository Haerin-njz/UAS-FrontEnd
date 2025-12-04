#!/usr/bin/env node
/* eslint-disable */
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'db', 'cinema.db');
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

  const tables = ['movies','screenings','auditoriums','seats','bookings','tickets','payments','seat_locks','promotions','users'];
  let i = 0;

  function next() {
    if (i >= tables.length) { db.close(); return; }
    const t = tables[i++];
    db.all("PRAGMA table_info('"+t+"')", (err, rows) => {
      console.log('\nPRAGMA table_info(' + t + '):');
      if (err) console.error(err); else console.log(rows);
      next();
    });
  }

  next();
});
