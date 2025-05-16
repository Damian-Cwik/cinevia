import { NavLink } from "react-router";
import styles from "./NavItemList.module.css";


const NavItemList = ({ navItems, activeNav, setActiveNav, setIsActive, hiding = false }) => {

   return (
      <ul className={`${styles.navigationList} ${hiding ? styles.hideList : ''}`}>

         {navItems.map(item => (
            <li
               key={item}
               className={`${styles.navButton} ${activeNav === item ? styles.active : ''}`}
               onClick={() => {
                  setActiveNav(item);
                  setIsActive(false);
               }}
            >
               {item}
            </li>
         ))}


         <li key="auth">
            <NavLink to="/auth" end className={styles.navButton}>
               Zaloguj się
            </NavLink>
         </li>

      </ul>
   )
}


export default NavItemList;