import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { getFavoriteMovies } from '../../api'; // Import funkcji API
import styles from './Profile.module.css';
import Header from '../Header/Header';

const Profile = () => {
  const { id } = useParams();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [nasaPic, setNasaPic] = useState();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_NASA_API_KEY,
    },
  };

  // Pobieranie danych użytkownika
  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        setNasaPic(res);
        if (res.url) {
          localStorage.setItem('nasaPicUrl', res.url);
        }
      });

    console.log(nasaPic)
    console.log(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`)

  }, [])

  // Pobieranie ulubionych filmów z backendu
  useEffect(() => {
    if (user) {
      getFavoriteMovies(user.id)
        .then((movies) => {
          setFavoriteMovies(
            movies.map((movie) => ({
              id: movie.movie_id,
              title: movie.title,
              year: movie.year,
            }))
          );
        })
        .catch((err) => console.error('Błąd podczas pobierania ulubionych filmów:', err));
    }
  }, [user]);

  if (!user) return <p className={styles.loading}>Ładowanie...</p>;

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const quotes = [
    "Żyj tak, jakbyś miał umrzeć jutro. Ucz się tak, jakbyś miał żyć wiecznie.",
    "Sukces to suma małych wysiłków powtarzanych dzień po dniu.",
    "Najlepszy czas na działanie był 20 lat temu. Drugi najlepszy jest teraz.",
    "Nie czekaj. Czas nigdy nie będzie odpowiedni.",
    "Rób to, co możesz, tam gdzie jesteś, z tym co masz.",
    "Nie poddawaj się, bo to właśnie jest miejsce i czas, w którym możesz zmienić wszystko.",
    "Twoje życie staje się lepsze tylko wtedy, gdy Ty stajesz się lepszy.",
    "Bądź zmianą, którą chcesz zobaczyć w świecie.",
    "Nie porównuj się z innymi. Porównuj się z tym, kim byłeś wczoraj.",
    "Odważ się marzyć, bo marzenia są początkiem wszystkiego.",
    "Sukces to nie klucz do szczęścia. Szczęście jest kluczem do sukcesu.",
    "Przeszłość nie definiuje twojej przyszłości.",
    "Każdy dzień jest nową szansą, aby zmienić swoje życie.",
    "Nie musisz być wielki, by zacząć, ale musisz zacząć, by być wielki.",
    "Wiara w siebie jest pierwszym krokiem do sukcesu.",
    "Nie bój się porażki. Bój się tego, że nigdy nie spróbujesz.",
    "Wytrwałość jest kluczem do mistrzostwa.",
    "Nie ma skrótu do miejsca, do którego warto dojść.",
    "Twoje nastawienie, a nie talent, zadecyduje o twoim sukcesie.",
    "Działaj, nawet jeśli boisz się porażki.",
    "Przyszłość należy do tych, którzy wierzą w piękno swoich marzeń.",
  ];

  return (
    <>
      <Header />
      <div className={styles.profileContainer} style={
        nasaPic && nasaPic.url
          ? {
            backgroundImage: `url(${localStorage.getItem('nasaPicUrl')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
          : {
            background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
          }
      }>
        <header className={styles.header}>
          <h1 className={styles.h1}>Witaj, {user.name}!</h1>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Wyloguj się
          </button>
        </header>

        <section className={styles.infoSection}>
          <h2 className={styles.h2}>Twoje dane</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Data urodzenia:</strong> {user.date}
          </p>
        </section>

        <section className={styles.favoritesSection}>
          <h2 className={styles.h2}>Ulubione filmy</h2>
          {favoriteMovies.length === 0 ? (
            <p>Nie masz jeszcze ulubionych filmów.</p>
          ) : (
            <ul className={styles.favoritesList}>
              {favoriteMovies.map((movie) => (
                <li key={movie.id}>
                  {movie.title} ({movie.year})
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.quoteSection}>
          <h2 className={styles.h2}>Inspirujące cytaty</h2>
          <blockquote>
            "{quotes[Math.floor(Math.random() * quotes.length)]}"
          </blockquote>
        </section>
      </div>
    </>
  );
};

export default Profile;