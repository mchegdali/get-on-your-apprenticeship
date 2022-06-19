import { useRecoilValue } from "recoil";
import { searchQuery } from "../search.store";
import styles from "./search-result.module.css";

const SearchResult = () => {
  const searchResult = useRecoilValue(searchQuery);
  return (
    <table className={styles.table_students}>
      <caption>
        {searchResult.length > 0 && `Found ${searchResult.length} characters`}
      </caption>
      <thead>
        <tr>
          {["Name", "House", "Surname", "Date of birth"].map((thContent) => (
            <th>{thContent}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {searchResult.map((student) => (
          <tr>
            <td>{student.name}</td>
            <td>{student.house}</td>
            <td>{student.surname || "No surname"}</td>
            <td>{student.dateOfBirth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchResult;
