import styles from "./link-back-to-dashboard.module.scss";
import { Link } from "react-router-dom";

export default function LinkBackToDashboard() {
  return (
    <Link className={styles.linkBackToDashboard} to={"/dashboard"}>
      &larr; back
    </Link>
  );
}
