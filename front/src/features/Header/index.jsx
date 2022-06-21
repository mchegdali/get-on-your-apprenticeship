import { Link, NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import classNames from "classnames";

import logo from "../../assets/images/hogwarts.png";
import { ReactComponent as MenuIcon } from "../../assets/icons/ic_menu_36px.svg";
import { ReactComponent as CloseMenuIcon } from "../../assets/icons/ic_close_36px.svg";

import styles from "./header.module.css";

import { isMenuOpenState } from "./header.store";

const Header = () => {
  const [isMenuOpen, setIsMenuOn] = useRecoilState(isMenuOpenState);

  const handleClickMenuButton = (e) => {
    setIsMenuOn(!isMenuOpen);
  };

  const handleClickNavLink = (e) => {
    setIsMenuOn(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link
          to="/"
          onClick={handleClickNavLink}
          className={styles.navbar_brand}
        >
          <img src={logo} className={styles.navbar_logo} alt="logo" />
          <span className={styles.navbar_title}>School of Magical Data</span>
        </Link>
        <div>
          <button
            type="button"
            className={styles.btn_menu}
            onClick={handleClickMenuButton}
          >
            {isMenuOpen ? (
              <CloseMenuIcon className={styles.menu_icon} />
            ) : (
              <MenuIcon className={styles.menu_icon} />
            )}
          </button>
          <ul
            className={classNames(styles.navbar_nav, {
              [styles.show]: isMenuOpen,
            })}
          >
            <li className={styles.nav_item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames(styles.nav_link, {
                    [styles.active]: isActive,
                  })
                }
                onClick={handleClickNavLink}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink
                to="stats"
                className={({ isActive }) =>
                  classNames(styles.nav_link, {
                    [styles.active]: isActive,
                  })
                }
                onClick={handleClickNavLink}
              >
                Stats
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
