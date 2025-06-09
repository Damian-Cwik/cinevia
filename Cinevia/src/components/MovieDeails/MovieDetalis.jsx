import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
  addMyListMovie,
  deleteMyListMovie,
  getMyListMovies,
} from "../../api"; // Import funkcji API
import "./MovieDetails.css";
import Header from "../Header/Header";

const MovieDetails = ({ type }) => {
  const { id } = useParams(); // Pobieramy ID z URL

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  const { user } = useAuth();

  const [details, setDetails] = useState(null);
  const [video, setVideo] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);
  const [favPulse, setFavPulse] = useState(false);
  const [listPulse, setListPulse] = useState(false);

  // Pobieranie szczegółów (film/serial)
  useEffect(() => {
    if (!type || !id) return; // Upewniamy się, że `type` i `id` są dostępne

    const endpoint =
      type === "movie"
        ? `https://api.themoviedb.org/3/movie/${id}?language=pl`
        : `https://api.themoviedb.org/3/tv/${id}?language=pl`;

    fetch(endpoint, options)
      .then((res) => res.json())
      .then((res) => setDetails(res))
      .catch((err) => console.error("Błąd podczas pobierania szczegółów:", err));
  }, [id, type]);

  // Pobieranie trailera (film/serial)
  useEffect(() => {
    if (!type || !id) return; // Upewniamy się, że `type` i `id` są dostępne

    const endpoint =
      type === "movie"
        ? `https://api.themoviedb.org/3/movie/${id}/videos?language=pl`
        : `https://api.themoviedb.org/3/tv/${id}/videos?language=pl`;

    fetch(endpoint, options)
      .then((res) => res.json())
      .then((res) => {
        const trailer = res.results?.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        if (trailer) setVideo(trailer.key);
      })
      .catch((err) =>
        console.error("Błąd podczas pobierania trailera:", err)
      );
  }, [id, type]);

  // Sprawdzanie, czy jest ulubiony
  useEffect(() => {
    if (user) {
      getFavoriteMovies(user.id)
        .then((favoriteMovies) => {
          const isFav = favoriteMovies.some(
            (movie) => movie.movie_id === Number(id)
          );
          setIsFavorite(isFav);
        })
        .catch((err) =>
          console.error("Błąd podczas pobierania ulubionych filmów:", err)
        );
    }
  }, [id, user]);

  // Sprawdzanie, czy jest w "Moja Lista"
  useEffect(() => {
    if (user) {
      getMyListMovies(user.id)
        .then((myListMovies) => {
          const isInList = myListMovies.some(
            (movie) => movie.movie_id === Number(id)
          );
          setIsInMyList(isInList);
        })
        .catch((err) =>
          console.error('Błąd podczas pobierania filmów z "Moja Lista":', err)
        );
    }
  }, [id, user]);

  // Dodawanie/usuwanie z ulubionych
  const toggleFavorite = () => {
    setFavPulse(true);
    setTimeout(() => setFavPulse(false), 400);
    if (!user || !details) return;

    if (isFavorite) {
      removeFavoriteMovie(user.id, details.id)
        .then(() => {
          setIsFavorite(false);
        })
        .catch((err) =>
          console.error("Błąd podczas usuwania filmu z ulubionych:", err)
        );
    } else {
      const movieData = {
        movie_id: details.id,
        title: details.title || details.name, // Obsługa filmów i seriali
        year: (details.release_date || details.first_air_date)?.split("-")[0],
      };

      addFavoriteMovie(user.id, movieData)
        .then(() => {
          setIsFavorite(true);
        })
        .catch((err) =>
          console.error("Błąd podczas dodawania filmu do ulubionych:", err)
        );
    }
  };

  // Dodawanie/usuwanie z "Moja Lista"
  const toggleMyList = () => {
    setListPulse(true);
    setTimeout(() => setListPulse(false), 400);
    if (!user || !details) return;

    if (isInMyList) {
      deleteMyListMovie(user.id, details.id)
        .then(() => {
          setIsInMyList(false);
        })
        .catch((err) =>
          console.error('Błąd podczas usuwania filmu z "Moja Lista":', err)
        );
    } else {
      const movieData = {
        movie_id: details.id,
        title: details.title || details.name, // Obsługa filmów i seriali
        image_poster: details.poster_path,
        rating: details.vote_average,
        release_date: details.release_date || details.first_air_date, // Obsługa daty
        category_array: details.genres.map((genre) => genre.name),
      };

      addMyListMovie(user.id, movieData)
        .then(() => {
          setIsInMyList(true);
        })
        .catch((err) =>
          console.error('Błąd podczas dodawania filmu do "Moja Lista":', err)
        );
    }
  };

  if (!details) {
    return (
      <>
        <Header />
        <div className="loading-message">Ładowanie danych...</div>
      </>
    );
  }

  const backgroundPath = details.backdrop_path || details.poster_path;
  const backgroundImage = backgroundPath
    ? `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
    : "none";

  return (
    <>
      <Header />
      <div className="movie-details-hero" style={{ backgroundImage }}>
        <div className="overlay">
          <div className="details-content">
            <h1>{details.title || details.name}</h1>
            <p>{details.overview}</p>

            {user && (
              <>
                <button
                  className={`favorite-button ${isFavorite ? "favorited" : ""} ${favPulse ? "button-pulse" : ""}`}
                  onClick={toggleFavorite}
                  style={{ position: "relative", overflow: "visible" }}
                >
                  {isFavorite ? "Usuń z ulubionych ❤️" : "Dodaj do ulubionych 🤍"}
                  {favPulse && (
                    <span className="hearts-container">
                      <span className="heart heart1">❤️</span>
                      <span className="heart heart2">❤️</span>
                      <span className="heart heart3">❤️</span>
                    </span>
                  )}
                </button>
                <button
                  className={`add-to-list-button ${isInMyList ? "in-list" : ""} ${listPulse ? "button-pulse" : ""}`}
                  onClick={toggleMyList}
                  style={{ position: "relative", overflow: "visible" }}
                >
                  {isInMyList
                    ? "Usuń z mojej listy ✖️📄"
                    : "Dodaj do mojej listy 📄"}
                  {listPulse && (
                    <span className="papers-container">
                      <span className="paper paper1">📄</span>
                      <span className="paper paper2">📄</span>
                      <span className="paper paper3">📄</span>
                    </span>
                  )}
                </button>
              </>
            )}
            {video && (
              <div className="trailer-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${video}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;