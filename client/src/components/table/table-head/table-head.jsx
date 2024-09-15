import styles from "./table-head.module.scss";
import { memo } from "react";

/**
 * @constant
 * Array of strings representing the table's columns' titles.
 *
 * @type {string[]}
 */
const tableHeadTitles = ["N°", "Title", "Stars", "Image", "Note", "Actions"];

/**
 * TableHead component.
 * It renders the table head of the dashboard table, displaying table's columns' titles.
 *
 * @returns {JSX.Element} The rendered TableHead component.
 */
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
