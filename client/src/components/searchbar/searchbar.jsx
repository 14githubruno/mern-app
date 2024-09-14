import styles from "./searchbar.module.scss";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";

/**
 * Searchbar component.
 * It renders the searchbar of the user dashboard.
 *
 * (The searchbar is used to filter tvseries in the dashboard table)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.contentIsLoading - Indicates if a fetching request is being made on tvseries.
 *
 * @returns {JSX.Element} The rendered Searchbar component.
 */
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
          id="searchbar"
          type="search"
          role="searchbox"
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
