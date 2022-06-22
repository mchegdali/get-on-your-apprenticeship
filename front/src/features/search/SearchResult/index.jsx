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
        <div className={styles.row_heading}>
          {["Name", "House", "Surname", "Date of birth"].map((heading) => (
            <span className={classNames(styles.heading)}>{heading}</span>
          ))}
        </div>
        {searchResult.map((student) => (
          <div className={styles.row_result}>
            <span className={styles.cell}>{student.name}</span>
            <span className={styles.cell}>{student.house}</span>
            <span className={styles.cell}>
              {student.surname || "None"}
            </span>
            <span className={styles.cell}>{student.dateOfBirth || "Unknown"}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResult;
