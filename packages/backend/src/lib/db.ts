import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'quizgenny.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    tier TEXT DEFAULT 'free',
    usage_quota INTEGER DEFAULT 10,
    monthly_quota INTEGER DEFAULT 10,
    stripe_customer_id TEXT,
    email_verified INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS quiz (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    created_at TEXT DEFAULT (datetime('now')),
    data TEXT
  );

  CREATE TABLE IF NOT EXISTS password_reset_token (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS email_verification_token (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    expires_at TEXT NOT NULL
  );
`);

export default db;
