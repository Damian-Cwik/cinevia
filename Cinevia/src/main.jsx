import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './AuthContext';

import App from './App.jsx';
import AuthForm from './components/AuthForm/AuthForm.jsx';
import Profile from './components/Profile/Profile.jsx';
import MovieDetails from './components/MovieDeails/MovieDetalis.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/user/:id" element={<Profile />}/>
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);