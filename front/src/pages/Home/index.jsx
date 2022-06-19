import { Suspense } from "react";
import SearchBar from "../../features/search/SearchBar";
import SearchResult from "../../features/search/SearchResult";
import Spinner from "../../features/Spinner";

import styles from "./home.module.css";

const HomePage = () => {
  return (
    <>
      <SearchBar />
      <Suspense
        fallback={
          <div className={styles.fallback_result}>
            <Spinner />
          </div>
        }
      >
        <SearchResult />
      </Suspense>
    </>
  );
};

export default HomePage;
