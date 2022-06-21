import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import classNames from "classnames";

import Header from "../Header";
import { isMenuOpenState } from "../Header/header.store";
import styles from "./layout.module.css";

const Layout = () => {
  const isMenuOpen = useRecoilValue(isMenuOpenState);
  return (
    <>
      <Header />
      <main
        className={classNames(styles.main, { [styles.menu_open]: isMenuOpen })}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
