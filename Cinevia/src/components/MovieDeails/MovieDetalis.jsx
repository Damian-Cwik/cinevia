import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) return <div className="movie-not-found">Movie not found</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-backdrop" style={{ backgroundImage: url(${movie.backdrop || movie.image}) }}>
        <button className="back-button" onClick={() => navigate(-1)}>← Back to Movies</button>
      </div>

      <div className="movie-content">
        <div className="movie-poster-container">
          <img src={movie.image} alt={movie.title} className="movie-poster-large" />
        </div>

        <div className="movie-info">
          <div className="movie-header">
            <h1>{movie.title} <span className="movie-year">({movie.year.split('-')[0]})</span></h1>
            <div className="movie-rating-large">
              <span className="star">★</span> {movie.rating}
            </div>
          </div>

          <div className="movie-meta">
            <span className="movie-category">{movie.category}</span>
            <span className="movie-duration">2h 28m</span>
          </div>

          <div className="movie-description">
            <h3>Overview</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
          </div>

          <div className="movie-actions">
            <button className="play-button">▶ Play</button>
            <button className="add-to-list">+ Add to List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;