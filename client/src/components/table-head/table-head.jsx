import styles from "./table-head.module.scss";
import { memo } from "react";

function TableHead() {
  return (
    <div className={styles.tableHead}>
      <span className={styles.tableHeadHeading}>N°</span>
      <span className={styles.tableHeadHeading}>Title</span>
      <span className={styles.tableHeadHeading}>Stars</span>
      <span className={styles.tableHeadHeading}>Image</span>
      <span className={styles.tableHeadHeading}>Note</span>
      <span className={styles.tableHeadHeading}>Actions</span>
    </div>
  );
}

export default memo(TableHead);
