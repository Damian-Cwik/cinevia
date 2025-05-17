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

  // Jeśli hasła są hashowane: użyj bcrypt.compare
  // const match = await bcrypt.compare(password, user.password);
  const match = user.password === password;

  if (!match) {
    return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
  }

  // Wysyłamy dane użytkownika bez hasła
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});