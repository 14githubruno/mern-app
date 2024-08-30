import styles from "./link-back.module.scss";
import { Link } from "react-router-dom";

export default function LinkBack({ linkHref }) {
  return (
    <Link
      aria-label="link to previous page"
      className={styles.linkBack}
      to={linkHref}
    >
      &larr; back
    </Link>
  );
}
