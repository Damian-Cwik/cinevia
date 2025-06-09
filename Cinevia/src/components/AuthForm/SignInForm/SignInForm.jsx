import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../AuthContext';
import { createUser } from '../../../api';

const SignInForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    birthdate: '',
    password: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const user = await createUser({
        name: form.name,
        email: form.email,
        date: form.birthdate,
        password: form.password,
      });

      login(user);

      setSuccess(true);
      setForm({ name: '', email: '', birthdate: '', password: '' });
      
      navigate('/');
    } catch (err) {
      setError('Błąd podczas rejestracji użytkownika.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        <label htmlFor="name" className="label">Imię</label>
        <input
          type="text"
          name="name"
          id="name"
          className="input"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

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
        <label htmlFor="birthdate" className="label">Data urodzenia</label>
        <input
          type="date"
          name="birthdate"
          id="birthdate"
          className="input date"
          value={form.birthdate}
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

      <button type="submit" className="submitButton">Zarejestruj się</button>

      {success && <p className="success">Rejestracja zakończona sukcesem!</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default SignInForm;