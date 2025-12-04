import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'db.sqlite');
const db = new Database(dbPath);

// Initialize schema
db.exec(`
PRAGMA journal_mode=WAL;

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL UNIQUE,
  film TEXT,
  poster TEXT,
  name TEXT,
  email TEXT,
  quantity INTEGER,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now')),
  date TEXT
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  method TEXT,
  provider TEXT,
  amount REAL DEFAULT 0,
  status TEXT,
  details TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(order_id) REFERENCES orders(order_id)
);
`);

// Prepared statements
const insertOrderStmt = db.prepare(
  `INSERT INTO orders (order_id, film, poster, name, email, quantity, status, date) VALUES (@order_id, @film, @poster, @name, @email, @quantity, @status, @date)`
);
const insertPaymentStmt = db.prepare(
  `INSERT INTO payments (order_id, method, provider, amount, status, details) VALUES (@order_id, @method, @provider, @amount, @status, @details)`
);
const getOrdersStmt = db.prepare(`SELECT * FROM orders ORDER BY created_at DESC`);
const getOrdersByEmailStmt = db.prepare(`SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC`);
const getPaymentsForOrderStmt = db.prepare(`SELECT * FROM payments WHERE order_id = ? ORDER BY created_at DESC`);

export function createOrder(payload: {
  order_id: string;
  film?: string;
  poster?: string;
  date?: string;
  name: string;
  email: string;
  quantity: number;
  status?: string;
  payment?: { method: string; provider?: string; amount?: number; status?: string; details?: any };
}) {
  const info = insertOrderStmt.run({
    order_id: payload.order_id,
    film: payload.film || null,
    poster: payload.poster || null,
    name: payload.name,
    email: payload.email,
    quantity: payload.quantity,
    status: payload.status || 'pending',
    date: payload.date || null,
  });

  if (payload.payment) {
    insertPaymentStmt.run({
      order_id: payload.order_id,
      method: payload.payment.method,
      provider: payload.payment.provider || null,
      amount: payload.payment.amount || 0,
      status: payload.payment.status || 'pending',
      details: payload.payment.details ? JSON.stringify(payload.payment.details) : null,
    });
  }

  return { id: info.lastInsertRowid, order_id: payload.order_id };
}

export function listOrders(email?: string) {
  const orders = email ? getOrdersByEmailStmt.all(email) : getOrdersStmt.all();
  // attach payments
  return orders.map((o: any) => {
    const payments = getPaymentsForOrderStmt.all(o.order_id).map((p: any) => {
      try { p.details = p.details ? JSON.parse(p.details) : null; } catch { p.details = null; }
      return p;
    });
    return { ...o, payments };
  });
}

export default db;
