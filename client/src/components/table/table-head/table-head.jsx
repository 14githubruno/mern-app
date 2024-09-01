import styles from "./table-head.module.scss";
import { memo } from "react";

const tableHeadTitles = ["N°", "Title", "Stars", "Image", "Note", "Actions"];

function TableHead() {
  return (
    <div className={styles.tableHead}>
      {tableHeadTitles.map((title, index) => {
        return (
          <span key={index} className={styles.tableHeadHeading}>
            {title}
          </span>
        );
      })}
    </div>
  );
}

export default memo(TableHead);
