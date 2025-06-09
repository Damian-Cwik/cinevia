import styles from "./SearchMenu.module.css";

const SearchMenu = ({
  categories = [],
  activeCategory = "",
  searchQuery = "",
  setActiveCategory = () => {},
  setSearchQuery = () => {}
}) => {
   
   return (
      <>
         <div className={styles.searchContainer}>
            <input
               type="text"
               className={styles.searchInput}
               placeholder="Wyszukaj filmu..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>

         <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Kategorie</h3>
            {categories.map(category => (
               <button
                  key={category.name}
                  className={`${styles.filterButton} ${activeCategory === category.name ? styles.active : ""}`}
                  onClick={() => setActiveCategory(category.name)}
               >
                  {category.name}
               </button>
            ))}
         </div>
      </>
   )
}

export default SearchMenu;