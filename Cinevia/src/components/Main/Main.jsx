import { useState, useEffect } from "react";
import { Link } from "react-router";
import MovieCard from "../MovieCard/MovieCard.jsx";
import SearchMenu from "../SearchMenu/SearchMenu.jsx";

const Main = ({ categories, searchMenuProps }) => {

   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: import.meta.env.VITE_API_KEY
      }
   };

   const [movies, setMovies] = useState([]);

   useEffect(() => {
      if (categories.length === 0) return;

      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pl&page=1&sort_by=popularity.desc', options)
         .then(res => res.json())
         .then(res => {
            const moviesData = res.results.map(data => ({
               id: data.id,
               imagePoster: data.poster_path,
               rating: data.vote_average,
               title: data.title,
               releaseDate: data.release_date,
               categoryArray: data.genre_ids
                  .map(id => categories.find(category => category.id === id))
                  .map(category => category.name).slice(0, 2)
            }));
            setMovies(moviesData);
         })
         .catch(err => console.error(err));
   }, [categories]);

   const filteredMovies = movies.filter(movie => {
      const matchesCategory = searchMenuProps.activeCategory === "Wszystkie" || movie.categoryArray.some(category => category === searchMenuProps.activeCategory);
      const matchesSearch = movie.title.toLowerCase().includes(searchMenuProps.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
   });



   return (
      <main className="main-content">
         <section className="movie-grid">
            {filteredMovies.map(movie => (
               <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-link">
                  <MovieCard {...movie} />
               </Link>
            ))}
         </section>

         <aside className="sidebar">
            <SearchMenu {...searchMenuProps} />
         </aside>
      </main>
   )
}

export default Main;