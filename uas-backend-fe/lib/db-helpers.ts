import { db } from '@/db/database';

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
}

export function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, row) => {
        if (err) {
          console.error('Query error:', err);
          reject(err);
        }
        resolve((row as User) || null);
      }
    );
  });
}

export function getUserById(id: number): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id, email, full_name, phone_number, created_at, updated_at FROM users WHERE id = ?',
      [id],
      (err, row) => {
        if (err) {
          console.error('Query error:', err);
          reject(err);
        }
        resolve((row as User) || null);
      }
    );
  });
}

export function createUser(
  email: string,
  hashedPassword: string,
  fullName: string,
  phoneNumber?: string
): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (email, password, full_name, phone_number) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, fullName, phoneNumber || null],
      function(err) {
        if (err) {
          console.error('❌ Insert error:', err);
          reject(err);
        } else {
          console.log('✓ User inserted with ID:', this.lastID);
          resolve(this.lastID);
        }
      }
    );
  });
}

export function getAllUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT id, email, full_name, phone_number, created_at, updated_at FROM users',
      (err, rows) => {
        if (err) {
          console.error('Query error:', err);
          reject(err);
        }
        resolve((rows as User[]) || []);
      }
    );
  });
}
