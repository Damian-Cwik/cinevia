import styles from "./HamburgerButon.module.css";

const HamburgerButton = ({clickFn, isActive}) => {

   return (
      <button
         onClick={clickFn}
         className={`${styles.hamburger} ${isActive ? styles.hamburgerActive : ''}`}
      >
         <span className={styles.hamburgerBox}>
            <span className={styles.hamburgerInner}></span>
         </span>
      </button>
   )

}

export default HamburgerButton;