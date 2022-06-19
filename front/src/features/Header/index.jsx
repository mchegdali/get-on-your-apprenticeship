import React, { useCallback, useEffect, useState } from "react";
import logo from "../../assets/images/hogwarts.png";
import { ReactComponent as MenuIcon } from "../../assets/icons/ic_menu_36px.svg";
import { ReactComponent as CloseMenuIcon } from "../../assets/icons/ic_close_36px.svg";
import classnames from "classnames";

import styles from "./header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const scrollCallback = useCallback(
    () => window.scrollTo(scrollX, scrollY),
    [scrollX, scrollY]
  );

  useEffect(() => {
    // disable scroll when menu is open
    if (isMenuOn) {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
      window.addEventListener("scroll", scrollCallback);
    } else {
      window.removeEventListener("scroll", scrollCallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOn]);

  const handleClickMenuButton = (e) => {
    setIsMenuOn(!isMenuOn);
  };

  const handleClickNavLink = (e) => {
    setIsMenuOn(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles["navbar-brand"]}>
          <img src={logo} className={styles["navbar-logo"]} alt="logo" />
          <span className={styles["navbar-title"]}>
            The school of magical data
          </span>
        </div>
        <div>
          <button
            type="button"
            className={styles["btn-menu"]}
            onClick={handleClickMenuButton}
          >
            {isMenuOn ? (
              <CloseMenuIcon className={styles["menu-icon"]} />
            ) : (
              <MenuIcon className={styles["menu-icon"]} />
            )}
          </button>
          <ul
            className={classnames(styles["navbar-nav"], {
              [`${styles["show"]}`]: isMenuOn,
            })}
          >
            <li className={styles["nav-item"]}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classnames(styles["nav-link"], {
                    [`${styles["active"]}`]: isActive,
                  })
                }
                onClick={handleClickNavLink}
              >
                Home
              </NavLink>
            </li>
            <li className={styles["nav-item"]}>
              <NavLink
                to="stats"
                className={({ isActive }) =>
                  classnames(styles["nav-link"], {
                    [`${styles["active"]}`]: isActive,
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
