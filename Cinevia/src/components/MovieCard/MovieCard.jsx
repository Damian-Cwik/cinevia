import styles from './MovieCard.module.css';

const MovieCard = ({
   imagePoster,
   rating,
   title,
   releaseDate,
   categoryArray = [],  // Domyślna wartość, jeśli undefined
}) => {

   const year = releaseDate ? releaseDate.split("-")[0] : "brak daty";
   const roundRating = Math.round(rating * 100) / 100;
   const imagePath = imagePoster
      ? `https://image.tmdb.org/t/p/original/${imagePoster}`
      : ''; // lub ścieżka do placeholdera

   return (
      <div className={styles.movieCard}>
         <div
            className={styles.moviePoster}
            style={{ backgroundImage: imagePath ? `url(${imagePath})` : 'none' }}
         >
            <span className={styles.movieRating}>★ {roundRating}</span>
         </div>

         <div className={styles.movieInfo}>
            <h3 className={styles.movieTitle} title={title}>{title}</h3>
            <div className={styles.movieMeta}>
               <span>{year}</span>
               <span className={styles.categories}>{categoryArray.join(', ')}</span>
            </div>
         </div>
      </div>
   )
}

export default MovieCard;
