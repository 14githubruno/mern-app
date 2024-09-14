import styles from "./home-paragraph.module.scss";
import { BsFillSuitHeartFill } from "react-icons/bs";

/**
 * HomeParagraph component.
 * It renders the paragraph of the homepage.
 *
 * @returns {JSX.Element} The rendered HomeParagraph component.
 */
export default function HomeParagraph() {
  return (
    <p className={styles.homeParagraph}>
      Welkome to the ultimate Reakt Applikation, the safest place where you kan
      entrust your personal k-love
      <span className={styles.heartIconWrapper}>
        <BsFillSuitHeartFill
          aria-label="heart icon"
          className={styles.heartIcon}
        />
      </span>
    </p>
  );
}
