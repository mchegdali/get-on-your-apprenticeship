import { useRecoilState } from "recoil";
import styles from "./search-bar.module.css";
import { searchFilterState, searchValueState } from "../search.store";

const SearchBar = () => {
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);

  const handleSelect = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <p className={styles.searchbar_title}>Spell your search out</p>
      <div className={styles.input_group}>
        <input
          name="inputSearch"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Enter a spell"
          className={styles.input}
        />
        <select
          className={styles.select}
          onChange={handleSelect}
          value={searchFilter}
        >
          <option value="name">Name</option>
          <option value="house">House</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
