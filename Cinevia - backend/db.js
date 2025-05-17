import Database from 'better-sqlite3';

const db = new Database('./database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    date TEXT NOT NULL,
    password TEXT NOT NULL
  )
`);

export default db;