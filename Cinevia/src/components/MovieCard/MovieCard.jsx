import styles from './MovieCard.module.css';

const MovieCard = ({
   imagePoster,
   rating,
   title,
   releaseDate,
   categoryArray,
}) => {

   const year = releaseDate.split("-")[0];
   const roundRating = Math.round(rating * 100) / 100;
   const imagePath = `https://image.tmdb.org/t/p/original/${imagePoster}`;

   return (
      <div className={styles.movieCard}>
         <div
            className={styles.moviePoster}
            style={{ backgroundImage: `url(${imagePath})` }}
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