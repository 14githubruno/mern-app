import styles from "./searchbar.module.scss";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";

export default function Searchbar({ contentIsLoading }) {
  const { register } = useFormContext();
  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const noTvseries = tvseries?.length === 0;

  return (
    <form className={styles.searchbar}>
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="searchbar">
          label
        </label>
        <input
          readOnly={noTvseries || contentIsLoading}
          disabled={noTvseries || contentIsLoading}
          className={`${styles.searchbarInput} ${
            noTvseries ? styles.uselessSearchbarInput : ""
          }`}
          type="text"
          id="searchbar"
          autoComplete="off"
          placeholder={
            contentIsLoading
              ? "..."
              : noTvseries
              ? "No rows..."
              : "Searkh by title..."
          }
          {...register("searchbar")}
        />
        <BsFillSearchHeartFill
          aria-label="search icon"
          className={styles.searchIcon}
        />
      </div>
    </form>
  );
}
