import { NavLink } from "react-router";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Omnir</h1>
        <nav className={styles.nav}>
          <NavLink to='/' className={({isActive}) => isActive ? styles.isActive : styles.defaultLink}>
            Dashboard
          </NavLink>
          <NavLink to='/map' className={({isActive}) => isActive ? styles.isActive : styles.defaultLink}>
            Map View
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
