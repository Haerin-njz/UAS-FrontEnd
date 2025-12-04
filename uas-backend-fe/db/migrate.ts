import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

/**
 * Run all migration files from db/migrations directory
 * Migrations are executed in alphanumeric order (001_, 002_, etc.)
 */
export function runMigrations(db: sqlite3.Database) {
  return new Promise<void>((resolve, reject) => {
    const migrationsDir = path.join(process.cwd(), 'db', 'migrations');

    // Check if migrations directory exists
    if (!fs.existsSync(migrationsDir)) {
      console.log('ℹ️ No migrations directory found, skipping migrations.');
      resolve();
      return;
    }

    try {
      // Read all .sql files from migrations directory
      const migrationFiles = fs
        .readdirSync(migrationsDir)
        .filter((file) => file.endsWith('.sql'))
        .sort();

      if (migrationFiles.length === 0) {
        console.log('ℹ️ No migration files found.');
        resolve();
        return;
      }

      console.log(`🔄 Running ${migrationFiles.length} migration(s)...`);

      let completedCount = 0;

      // Execute each migration file
      migrationFiles.forEach((file) => {
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf-8');

        // Split by semicolon to handle multiple statements per file
        const statements = sql
          .split(';')
          .map((stmt) => stmt.trim())
          .filter((stmt) => stmt.length > 0);

        db.serialize(() => {
          statements.forEach((statement) => {
            db.run(statement, (err: Error | null) => {
              if (err) {
                console.error(`❌ Error executing migration ${file}:`, err.message);
              }
            });
          });

          completedCount++;
          console.log(`✅ Migration completed: ${file}`);

          // Resolve when all migrations are done
          if (completedCount === migrationFiles.length) {
            console.log('✨ All migrations completed successfully!');
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('❌ Migration error:', error);
      reject(error);
    }
  });
}
