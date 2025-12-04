#!/usr/bin/env node
/* eslint-disable */
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

function inspect(dbPath, label) {
  return new Promise((resolve) => {
    if (!fs.existsSync(dbPath)) {
      console.log(label + ': not found ->', dbPath);
      resolve();
      return;
    }
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        console.error('Failed to open', dbPath, err);
        resolve();
        return;
      }
      db.get("SELECT COUNT(*) as cnt FROM payments", (e, row) => {
        if (e) {
          console.log(label + ': payments table error ->', e.message);
          db.close();
          resolve();
          return;
        }
        console.log(label + ': payments count =', row.cnt);
        db.all('SELECT id, booking_id, provider, provider_reference, amount, status, paid_at, created_at FROM payments ORDER BY id DESC LIMIT 5', (err2, rows) => {
          if (err2) {
            console.log(label + ': payments select error ->', err2.message);
          } else {
            console.log(label + ': recent payments ->', rows);
          }
          db.close();
          resolve();
        });
      });
    });
  });
}

(async function(){
  const proj = process.cwd();
  const cinema = path.join(proj, 'db', 'cinema.db');
  const data = path.join(proj, 'data', 'db.sqlite');
  await inspect(cinema, 'cinema.db');
  console.log('---');
  await inspect(data, 'data/db.sqlite');
})();
