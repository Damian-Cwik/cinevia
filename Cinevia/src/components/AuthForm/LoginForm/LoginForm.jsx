import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Błąd logowania');
      }

      const user = await res.json();
      login(user);           // zapisz do contextu + localStorage
      navigate('/');         // przekieruj na stronę główną

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        <label htmlFor="email" className="label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="input"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="box"> 
        <label htmlFor="password" className="label">Hasło</label>
        <input
          type="password"
          name="password"
          id="password"
          className="input"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submitButton">Zaloguj się</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginForm;