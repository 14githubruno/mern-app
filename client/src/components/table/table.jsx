// styles
import styles from "./table.module.scss";

// components
import TableHead from "./table-head/table-head";
import TableRow from "./table-row/table-row";
import Loader from "../loader/loader";

// icons
import { PiMaskSadThin } from "react-icons/pi";
import { RxEyeNone } from "react-icons/rx";

// react lib
import { useMemo } from "react";

// redux lib
import { useSelector } from "react-redux";

// react-hook-form lib
import { useFormContext, useWatch } from "react-hook-form";

/**
 * Table component.
 *
 * It renders the dashboard table of tvseries.
 *
 * (It renders the TableRow component for each tvseries)
 *
 * (It renders the Loader component if needed)
 *
 * (Instead of TableRow component, it renders a certain icon with a message if user does not have any tvseries, and another icon with another message if user has tvseries but none of their titles matches what's typed in Searchbar component)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.contentIsLoading - Indicates if the content (table row of tvseries) is loading and not ready to be displayed.
 * @param {object.<function>} props.tableRowActions - Object of functions to read, update and delete tvseries (these functions will be passed to TableRow component).
 *
 * @returns {JSX.Element} The rendered Table component.
 */
export default function Table({ contentIsLoading, tableRowActions }) {
  const { control } = useFormContext();
  const filter = useWatch({ control, name: "searchbar" });
  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const noTvseries = tvseries?.length > 0;

  const table_rows = useMemo(
    () =>
      noTvseries &&
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
              {...tableRowActions}
            />
          );
        }),
    [noTvseries, tvseries, filter]
  );

  const there_are_no_rows_and_paragraph = !noTvseries && (
    <div className={styles.nothingContainer}>
      <PiMaskSadThin
        aria-label="sad face icon"
        className={styles.nothingIcon}
      />
      <span className={styles.nothingParagraph}>
        You have nothing to display. Start kreating your table rows.
      </span>
    </div>
  );

  const table_row_not_found_and_paragraph = noTvseries &&
    !tvseries.some((singleSeries) =>
      singleSeries.title.toLowerCase().includes(filter.toLowerCase())
    ) && (
      <div className={styles.nothingContainer}>
        <RxEyeNone
          aria-label="not found icon"
          className={styles.notFoundIcon}
        />
        <span className={styles.nothingParagraph}>
          None of your table rows contains that title. Try another one or kreate
          it.
        </span>
      </div>
    );

  const show_content_when_loading_has_finished = contentIsLoading ? (
    <Loader />
  ) : (
    <>
      {table_rows}
      {table_row_not_found_and_paragraph}
      {there_are_no_rows_and_paragraph}
    </>
  );

  return (
    <article
      className={`${styles.baseTable} ${
        !noTvseries ||
        !tvseries?.some((singleSeries) =>
          singleSeries.title.toLowerCase().includes(filter.toLowerCase())
        )
          ? styles.tableHide
          : styles.tableShow
      }`}
    >
      <TableHead />
      {show_content_when_loading_has_finished}
    </article>
  );
}
