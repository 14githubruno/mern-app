import styles from "./searchbar.module.scss";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";

export default function Searchbar() {
  const { register } = useFormContext();
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
          {...register("searchbar")}
        />
        <BsFillSearchHeartFill className={styles.searchIcon} />
      </div>
    </form>
  );
}
