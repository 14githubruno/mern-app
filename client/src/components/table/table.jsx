import styles from "./table.module.scss";
import { PiMaskSadThin } from "react-icons/pi";
import { RxEyeNone } from "react-icons/rx";
import TableRow from "../table-row/table-row";

export default function Table({ tvseries, filter }) {
  const there_are_tvseries = tvseries?.length > 0;

  const table_rows =
    there_are_tvseries &&
    tvseries
      .filter((singleSeries) =>
        singleSeries.title.toLowerCase().includes(filter.toLowerCase())
      )
      .map((singleTvseries, index) => {
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

  const table_row_not_found_and_paragraph = there_are_tvseries &&
    !tvseries.some((singleSeries) =>
      singleSeries.title.toLowerCase().includes(filter.toLowerCase())
    ) && (
      <div className={styles.nothingContainer}>
        <RxEyeNone className={styles.notFoundIcon} />
        <span className={styles.nothingParagraph}>
          None of your table rows contains that title. Try another one or kreate
          it.
        </span>
      </div>
    );

  return (
    <article
      className={`${styles.baseTable} ${
        !there_are_tvseries ||
        !tvseries?.some((singleSeries) =>
          singleSeries.title.toLowerCase().includes(filter.toLowerCase())
        )
          ? styles.tableHide
          : styles.tableShow
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
      {table_row_not_found_and_paragraph}
      {sad_icon_and_paragraph}
    </article>
  );
}
