import styles from "./table.module.scss";
import { PiMaskSadThin } from "react-icons/pi";
import TableRow from "../table-row/table-row";

export default function Table({ tvseries }) {
  const there_are_tvseries = tvseries?.length > 0;

  const table_rows =
    there_are_tvseries &&
    tvseries.map((singleTvseries, index) => {
      return (
        <TableRow
          key={singleTvseries._id}
          id={singleTvseries._id}
          num={`#${index + 1}`}
          {...singleTvseries}
        />
      );
    });

  const sad_icon_and_paragraph = !there_are_tvseries && (
    <div className={styles.nothingContainer}>
      <PiMaskSadThin className={styles.sadIcon} />
      <span className={styles.nothingParagraph}>
        You have nothing to display. Start kreating your table rows.
      </span>
    </div>
  );

  return (
    <article
      className={`${styles.baseTable} ${
        tvseries?.length === 0 ? styles.tableHide : styles.tableShow
      }`}
    >
      <div className={styles.tableHead}>
        <span className={styles.tableHeadHeading}>N°</span>
        <span className={styles.tableHeadHeading}>Title</span>
        <span className={styles.tableHeadHeading}>Stars</span>
        <span className={styles.tableHeadHeading}>Image</span>
        <span className={styles.tableHeadHeading}>Note</span>
        <span className={styles.tableHeadHeading}>Actions</span>
      </div>
      <div>{table_rows}</div>
      {sad_icon_and_paragraph}
    </article>
  );
}
