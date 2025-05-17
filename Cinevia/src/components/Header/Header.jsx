import { useState, useEffect } from "react";
import { Link } from "react-router";
import HamburgerButton from "./HamburgerButton/HamburgerButton";
import NavItemList from "./NavItemList/NavItemList";
import SearchMenu from "../SearchMenu/SearchMenu";
import styles from './Header.module.css';

const Header = ({ searchMenuProps }) => {
   const navItems = ["Filmy", "Seriale", "Nowości", "Moja lista"];
   const [activeNav, setActiveNav] = useState("Filmy");
   const [isActive, setIsActive] = useState(false);

   const categoryProps = { navItems, activeNav, setActiveNav, setIsActive };

   const handleClick = () => {
      setIsActive(prev => !prev);
   };

   useEffect(() => {
      if (isActive) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = '';
      }

      return () => {
         document.body.style.overflow = '';
      };
   }, [isActive]);


   return (
      <header className={styles.header}>
         <Link to="/" className={styles.link}><h1 className={styles.logo}>CineVia</h1></Link>
         <nav className={styles.nav}>
            <HamburgerButton clickFn={handleClick} isActive={isActive} />
            <NavItemList {...categoryProps} hiding={true} />

            <div className={`${styles.navigation} ${isActive ? styles.navigationActive : ''}`}>
               <div className={styles.navWrapper}>
                  <HamburgerButton clickFn={handleClick} isActive={isActive} />
                  <h1 className={styles.logo}>CineVia</h1>
               </div>
               <NavItemList {...categoryProps} />

               <div className={styles.search}>
                  <SearchMenu {...searchMenuProps} />
               </div>
            </div>

         </nav>
      </header>
   );
}

export default Header;
