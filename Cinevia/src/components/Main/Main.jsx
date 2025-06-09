import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard.jsx";
import SearchMenu from "../SearchMenu/SearchMenu.jsx";

const Main = ({ categories = [], searchMenuProps, activeNav }) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Sprawdzenie, czy categories jest poprawnie zainicjalizowane
    if (!categories || categories.length === 0) return;

    let endpoint = "";

    // Wybór odpowiedniego endpointu w zależności od aktywnej zakładki
    if (activeNav === "Filmy") {
      endpoint =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pl&page=1&sort_by=popularity.desc";
    } else if (activeNav === "Seriale") {
      endpoint =
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=pl&page=1&sort_by=popularity.desc";
    } else if (activeNav === "Nowości") {
      endpoint =
        "https://api.themoviedb.org/3/trending/all/week?language=pl";
    }

    fetch(endpoint, options)
      .then((res) => res.json())
      .then((res) => {
        const moviesData = res.results.map((data) => ({
          id: data.id,
          imagePoster: data.poster_path,
          rating: data.vote_average,
          title: data.title || data.name, // Dla seriali używamy `name`
          releaseDate: data.release_date || data.first_air_date, // Dla seriali używamy `first_air_date`
          mediaType: data.media_type || (activeNav === "Filmy" ? "movie" : "tv"), // Obsługa typu dla nowości
          categoryArray: data.genre_ids
            .map((id) => categories.find((category) => category.id === id))
            .filter((category) => category !== undefined) // Usuń undefined
            .map((category) => category.name)
            .slice(0, 2),
        }));
        setMovies(moviesData);
      })
      .catch((err) => console.error(err));
  }, [categories, activeNav]); // Dodajemy `activeNav` jako zależność

  const filteredMovies = movies.filter((movie) => {
    const matchesCategory =
      searchMenuProps.activeCategory === "Wszystkie" ||
      movie.categoryArray.some(
        (category) => category === searchMenuProps.activeCategory
      );
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchMenuProps.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="main-content">
      <section className="movie-grid">
        {filteredMovies.map((movie) => (
          <Link
            to={
              movie.mediaType === "tv"
                ? `/tv/${movie.id}`
                : `/movie/${movie.id}`
            } // Dynamiczny link dla filmów, seriali i nowości
            key={movie.id}
            className="movie-link"
          >
            <MovieCard {...movie} />
          </Link>
        ))}
      </section>

      <aside className="sidebar">
        <SearchMenu {...searchMenuProps} />
      </aside>
    </main>
  );
};

export default Main;