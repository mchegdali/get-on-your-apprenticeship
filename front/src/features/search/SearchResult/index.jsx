import { useRecoilValue } from "recoil";
import classNames from "classnames";

import { searchQuery } from "../search.store";
import styles from "./search-result.module.css";

const SearchResult = () => {
  const searchResult = useRecoilValue(searchQuery);
  return (
    <section>
      <p className={styles.result_count}>
        {searchResult.length > 0 && `Found ${searchResult.length} characters`}
      </p>
      <div className={styles.container_result}>
        {["Name", "House", "Surname", "Date of birth"].map((heading) => (
          <span className={classNames(styles.cell, styles.heading)}>
            {heading}
          </span>
        ))}
        {searchResult.map((student) => (
          <>
            <span className={styles.cell}>{student.name}</span>
            <span className={styles.cell}>{student.house}</span>
            <span className={styles.cell}>
              {student.surname || "No surname"}
            </span>
            <span className={styles.cell}>{student.dateOfBirth}</span>
          </>
        ))}
      </div>
    </section>
  );
};

export default SearchResult;
