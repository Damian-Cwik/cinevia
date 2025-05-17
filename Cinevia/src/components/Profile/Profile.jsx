import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext'; 

const Profile = () => {
  const { id } = useParams();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <p>Ładowanie...</p>;

  const handleLogout = () => {
    logout();
    window.location.href = '/'; 
  };

  return (
    <div>
      <h1>Profil użytkownika {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Data urodzenia: {user.date}</p>
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  );
};

export default Profile;
