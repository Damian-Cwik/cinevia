import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { id } = useParams();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_API_KEY
    }
  };

  const [movieDetails, setMovieDetails] = useState({});
  const [video, setVideo] = useState("");

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=pl`, options)
      .then(res => res.json())
      .then(res => setMovieDetails(res))
      .catch(err => console.error(err));
  }, [id]);


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pl`, options)
      .then(res => res.json())
      .then(res => setVideo(res.results[0].key))
      .catch(err => console.error(err));
  }, [id]);


  return (
    <>
      <img src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} width="100px" height="100px" alt="" />
      <h1>Opis</h1>
      <p>{movieDetails.overview}</p>

      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>

  );
};

export default MovieDetails;