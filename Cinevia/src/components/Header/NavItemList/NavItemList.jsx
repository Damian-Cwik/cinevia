import { NavLink } from "react-router";
import { useAuth } from '../../../AuthContext';
import styles from "./NavItemList.module.css";


const NavItemList = ({ navItems, activeNav, setActiveNav, setIsActive, hiding = false }) => {

  const { user, logout } = useAuth();

  return (
    <ul className={`${styles.navigationList} ${hiding ? styles.hideList : ''}`}>

      {navItems.map(item => (
        <li
          key={item}
          onClick={() => {
            setActiveNav(item);
            setIsActive(false);
          }}
        >
          <NavLink to={`/`} end className={`${styles.navButton} ${activeNav === item ? styles.active : ''}`}>
            {item}
          </NavLink>
        </li>
      ))}

      {user ? (
        <>
          <li key="auth">
            <NavLink to={`/mylist/${user.id}`} end className={styles.navButton}>
              Moja lista
            </NavLink>
          </li>
          <li key="auth1">
            <NavLink to={`/user/${user.id}`} end className={styles.navButton}>
              Profil
            </NavLink>
          </li>
        </>
      ) : (
        <li key="auth">
          <NavLink to="/auth" end className={styles.navButton}>
            Zaloguj się
          </NavLink>
        </li>
      )}


    </ul>
  )
}


export default NavItemList;