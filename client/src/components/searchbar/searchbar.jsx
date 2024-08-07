import styles from "./searchbar.module.scss";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { FilterContext } from "../../context-providers/searchbar-filter-context";

export default function Searchbar() {
  const { filter, setFilter } = useContext(FilterContext);
  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const there_are_no_tvseries = tvseries?.length === 0;

  return (
    <form className={styles.searchbar}>
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="searchbar">
          label
        </label>
        <input
          readOnly={there_are_no_tvseries}
          disabled={there_are_no_tvseries}
          className={`${styles.searchbarInput} ${
            there_are_no_tvseries ? styles.uselessSearchbarInput : ""
          }`}
          type="text"
          id="searchbar"
          autoComplete="off"
          placeholder={
            there_are_no_tvseries ? "No rows..." : "Searkh by title..."
          }
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <BsFillSearchHeartFill className={styles.searchIcon} />
      </div>
    </form>
  );
}
