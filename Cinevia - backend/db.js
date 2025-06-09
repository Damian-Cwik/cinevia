import Database from 'better-sqlite3';

const db = new Database('./database.db');

// Tabela użytkowników
db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    date TEXT NOT NULL,
    password TEXT NOT NULL
  )
`);

// Tabela ulubionych filmów
db.exec(`
  CREATE TABLE IF NOT EXISTS favorite_movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS my_list_movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    image_poster TEXT NOT NULL,
    rating REAL NOT NULL,
    release_date TEXT NOT NULL,
    category_array TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
  )
`);

export default db;