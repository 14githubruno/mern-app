import styles from "./table.module.scss";
import { PiMaskSadThin } from "react-icons/pi";
import { RxEyeNone } from "react-icons/rx";
import { useSelector } from "react-redux";
import TableHead from "../table-head/table-head";
import TableRow from "../table-row/table-row";

export default function Table({
  filter,
  contentIsLoading,
  contentIsBeingDeleted,
  toggleModalToDelete,
  selectTableRowToDelete,
  showTableRowInModalView,
}) {
  const tvseries = useSelector((state) => state.tvseries.tvseries);
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
            toggleModalToDelete={toggleModalToDelete}
            selectTableRowToDelete={() =>
              selectTableRowToDelete(singleTvseries._id)
            }
            showTableRowInModalView={() => {
              showTableRowInModalView(singleTvseries._id);
            }}
          />
        );
      });

  const there_are_no_rows_and_paragraph = !there_are_tvseries && (
    <div className={styles.nothingContainer}>
      <PiMaskSadThin className={styles.nothingIcon} />
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
      <TableHead />
      {contentIsLoading || contentIsBeingDeleted ? (
        <h1
          style={{
            color: "white",
            fontSize: "10rem",
            textAlign: "center",
            margin: "3rem 0 0 0",
          }}
        >
          ...
        </h1>
      ) : (
        <>
          {table_rows}
          {table_row_not_found_and_paragraph}
          {there_are_no_rows_and_paragraph}
        </>
      )}
    </article>
  );
}
