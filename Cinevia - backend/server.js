import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get all users
app.get('/users', (req, res) => {
  const stmt = db.prepare('SELECT * FROM user');
  const users = stmt.all();
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM user WHERE id = ?');
  const user = stmt.get(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: 'User not found' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const stmt = db.prepare('SELECT * FROM user WHERE email = ?');
  const user = stmt.get(email);

  if (!user) {
    return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
  }

  const match = user.password === password;

  if (!match) {
    return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
  }

  const { password: _, ...userData } = user;
  res.json(userData);
});

// Add new user
app.post('/users', (req, res) => {
  const { name, email, date, password } = req.body;
  const stmt = db.prepare('INSERT INTO user (name, email, date, password) VALUES (?, ?, ?, ?)');
  const info = stmt.run(name, email, date, password);
  res.json({ id: info.lastInsertRowid });
});

// Update user
app.put('/users/:id', (req, res) => {
  const { name, email, date, password } = req.body;
  const stmt = db.prepare(`
    UPDATE user SET name = ?, email = ?, date = ?, password = ? WHERE id = ?
  `);
  const info = stmt.run(name, email, date, password, req.params.id);
  if (info.changes) res.json({ updated: true });
  else res.status(404).json({ error: 'User not found' });
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM user WHERE id = ?');
  const info = stmt.run(req.params.id);
  if (info.changes) res.json({ deleted: true });
  else res.status(404).json({ error: 'User not found' });
});

// --- Favorite Movies Endpoints ---

// Get all favorite movies for a user
app.get('/users/:id/favorites', (req, res) => {
  const stmt = db.prepare('SELECT * FROM favorite_movies WHERE user_id = ?');
  const movies = stmt.all(req.params.id);
  res.json(movies);
});

// Add a favorite movie for a user
app.post('/users/:id/favorites', (req, res) => {
  const { movie_id, title, year } = req.body;
  const stmt = db.prepare(`
    INSERT INTO favorite_movies (user_id, movie_id, title, year)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(req.params.id, movie_id, title, year);
  res.json({ id: info.lastInsertRowid });
});

// Delete a favorite movie for a user
app.delete('/users/:id/favorites/:movie_id', (req, res) => {
  const stmt = db.prepare(`
    DELETE FROM favorite_movies WHERE user_id = ? AND movie_id = ?
  `);
  const info = stmt.run(req.params.id, req.params.movie_id);
  if (info.changes) res.json({ deleted: true });
  else res.status(404).json({ error: 'Favorite movie not found' });
});

// --- My List Movies Endpoints ---

// Get all "My List" movies for a user
app.get('/users/:id/my-list', (req, res) => {
  const stmt = db.prepare('SELECT * FROM my_list_movies WHERE user_id = ?');
  const movies = stmt.all(req.params.id);
  res.json(movies);
});

// Add a movie to "My List" for a user
app.post('/users/:id/my-list', (req, res) => {
  const { movie_id, title, image_poster, rating, release_date, category_array } = req.body;
  const stmt = db.prepare(`
    INSERT INTO my_list_movies (user_id, movie_id, title, image_poster, rating, release_date, category_array)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    req.params.id,
    movie_id,
    title,
    image_poster,
    rating,
    release_date,
    JSON.stringify(category_array) // Przechowywanie kategorii jako JSON
  );
  res.json({ id: info.lastInsertRowid });
});

// Delete a movie from "My List" for a user
app.delete('/users/:id/my-list/:movie_id', (req, res) => {
  const stmt = db.prepare(`
    DELETE FROM my_list_movies WHERE user_id = ? AND movie_id = ?
  `);
  const info = stmt.run(req.params.id, req.params.movie_id);
  if (info.changes) res.json({ deleted: true });
  else res.status(404).json({ error: 'Movie not found in My List' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});