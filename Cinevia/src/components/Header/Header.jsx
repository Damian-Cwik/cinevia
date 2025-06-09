import { useState, useEffect } from "react";
import { Link } from "react-router";
import HamburgerButton from "./HamburgerButton/HamburgerButton";
import NavItemList from "./NavItemList/NavItemList";
import SearchMenu from "../SearchMenu/SearchMenu";
import styles from "./Header.module.css";

const Header = ({ searchMenuProps = {}, activeNav, setActiveNav }) => {
   const navItems = ["Filmy", "Seriale", "Nowości"];
   const [isActive, setIsActive] = useState(false);

   const categoryProps = {
      navItems,
      activeNav,
      setActiveNav,
      setIsActive,
   };

   const handleClick = () => {
      setIsActive((prev) => !prev);
   };

   useEffect(() => {
      document.body.style.overflow = isActive ? "hidden" : "";
      return () => {
         document.body.style.overflow = "";
      };
   }, [isActive]);

   const shouldRenderSearch = Array.isArray(searchMenuProps.categories);

   return (
      <header className={styles.header}>
         <Link to="/" className={styles.link}>
            <h1 className={styles.logo}>CineVia</h1>
         </Link>
         <nav className={styles.nav}>
            <HamburgerButton clickFn={handleClick} isActive={isActive} />
            <NavItemList {...categoryProps} hiding={true} />

            <div
               className={`${styles.navigation} ${isActive ? styles.navigationActive : ""
                  }`}
            >
               <div className={styles.navWrapper}>
                  <HamburgerButton clickFn={handleClick} isActive={isActive} />
                  <h1 className={styles.logo}>CineVia</h1>
               </div>
               <NavItemList {...categoryProps} />

               {shouldRenderSearch && (
                  <div className={styles.search}>
                     <SearchMenu {...searchMenuProps} />
                  </div>
               )}
            </div>
         </nav>
      </header>
   );
};

export default Header;