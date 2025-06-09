const API_URL = 'http://localhost:3001/users';

// --- User API ---

export const getUsers = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return res.json();
};

// --- Favorite Movies API ---

export const getFavoriteMovies = async (userId) => {
  const res = await fetch(`${API_URL}/${userId}/favorites`);
  return res.json();
};

export const addFavoriteMovie = async (userId, movie) => {
  const res = await fetch(`${API_URL}/${userId}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  return res.json();
};

export const deleteFavoriteMovie = async (userId, movieId) => {
  const res = await fetch(`${API_URL}/${userId}/favorites/${movieId}`, {
    method: 'DELETE',
  });
  return res.json();
};

// --- My List Movies API ---

export const getMyListMovies = async (userId) => {
  const res = await fetch(`${API_URL}/${userId}/my-list`);
  return res.json();
};

export const addMyListMovie = async (userId, movie) => {
  const res = await fetch(`${API_URL}/${userId}/my-list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  return res.json();
};

export const deleteMyListMovie = async (userId, movieId) => {
  const res = await fetch(`${API_URL}/${userId}/my-list/${movieId}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const removeFavoriteMovie = async (userId, movieId) => {
  const res = await fetch(`${API_URL}/${userId}/favorites/${movieId}`, {
    method: 'DELETE',
  });
  return res.json();
};