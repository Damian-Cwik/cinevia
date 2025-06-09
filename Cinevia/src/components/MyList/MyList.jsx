import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import MovieCard from "../MovieCard/MovieCard";
import { getMyListMovies, deleteMyListMovie } from "../../api"; // Import funkcji API
import { useAuth } from "../../AuthContext"; // Import kontekstu autoryzacji
import "./MyList.css";

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const { user } = useAuth(); // Pobieranie danych użytkownika z kontekstu

  // Pobieranie filmów z "Moja Lista" z backendu
  useEffect(() => {
    if (user) {
      getMyListMovies(user.id)
        .then((movies) => {
          setMyList(movies);
        })
        .catch((err) => console.error("Błąd podczas pobierania listy filmów:", err));
    }
  }, [user]);

  // Usuwanie filmu z "Moja Lista"
  const removeFromList = (movieId) => {
    if (!user) return;

    deleteMyListMovie(user.id, movieId)
      .then(() => {
        // Aktualizacja lokalnego stanu po usunięciu filmu
        setMyList((prevList) => prevList.filter((movie) => movie.movie_id !== movieId));
      })
      .catch((err) => console.error("Błąd podczas usuwania filmu z listy:", err));
  };

  return (
    <>
      <Header />
      <main className="my-list-content">
        <h2>Moja lista</h2>
        {myList.length === 0 ? (
          <p>Nie masz jeszcze żadnych filmów na liście.</p>
        ) : (
          <section className="movie-grid">
            {myList.map((movie) => (
              <div key={movie.movie_id} className="movie-item-with-remove">
                <Link to={`/movie/${movie.movie_id}`} className="movie-link">
                  <MovieCard
                    id={movie.movie_id}
                    title={movie.title}
                    imagePoster={movie.image_poster}
                    rating={movie.rating}
                    releaseDate={movie.release_date}
                    categoryArray={JSON.parse(movie.category_array)} // Parsowanie kategorii z JSON
                  />
                </Link>
                <button
                  className="remove-button"
                  onClick={() => removeFromList(movie.movie_id)}
                >
                  Usuń
                </button>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
};

export default MyList;