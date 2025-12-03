#!/usr/bin/env node

/**
 * Script untuk testing database dan API
 * Jalankan dengan: npm run test-db
 */

/* eslint-disable */

const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db', 'cinema.db');

// Buka database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err);
    process.exit(1);
  }
  console.log('✅ Connected to database:', dbPath);
  checkDatabase();
});

function checkDatabase() {
  console.log('\n📊 Checking database structure...\n');

  // Cek users table
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error('❌ Error querying users:', err);
    } else {
      console.log('📝 Users table:');
      console.log('Total users:', rows.length);
      if (rows.length > 0) {
        console.log('\nData:');
        rows.forEach((user, index) => {
          console.log(`\n${index + 1}. User ID: ${user.id}`);
          console.log(`   Email: ${user.email}`);
          console.log(`   Name: ${user.full_name}`);
          console.log(`   Phone: ${user.phone_number || 'N/A'}`);
          console.log(`   Created: ${user.created_at}`);
        });
      } else {
        console.log('⚠️  Belum ada data user di database');
      }
    }

    console.log('\n' + '='.repeat(50) + '\n');
    db.close();
  });
}
