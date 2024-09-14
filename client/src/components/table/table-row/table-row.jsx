import styles from "./table-row.module.scss";
import { AiFillStar } from "react-icons/ai";
import { RxPencil1, RxMagnifyingGlass, RxTrash } from "react-icons/rx";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

/**
 * TableRow component.
 * It renders a single row in the dashboard table, displaying details of a single tvseries.
 *
 * (It also allows read, update and delete a single tvseries)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.num - The row number.
 * @param {string} props.id - The unique ID of the single tvseries.
 * @param {string} props.title - The title of the single tvseries.
 * @param {number} props.stars - The star rating of the single tvseries.
 * @param {string} props.image - The URL of the single tvseries image.
 * @param {string} props.note - The note on the single tvseries.
 * @param {function} props.toggleModalToDelete - A function to toggle the modal delete visibility.
 * @param {function} props.selectTableRowToDelete - A function to select the single tvseries to be deleted.
 * @param {function} props.showTableRowInModalView - A function to select and display the single tvseries' details in a modal.
 *
 * @returns {JSX.Element} The rendered TableRow component.
 */
function TableRow({
  num,
  id,
  title,
  stars,
  image,
  note,
  toggleModalToDelete,
  selectTableRowToDelete,
  showTableRowInModalView,
}) {
  const { control } = useFormContext();
  const filter = useWatch({ control, name: "searchbar" });
  const arrayOfStars = new Array(Number(stars)).fill("*");
  const restOfStars = new Array(5 - arrayOfStars.length).fill("*");

  return (
    <div className={styles.tableRow} key={id}>
      <div className={styles.num}>{num}</div>
      <div className={styles.title}>
        {title
          .replace(filter.toLowerCase(), "*")
          .split("")
          .map((sliceOfTitle, indexSlice) => {
            if (sliceOfTitle === "*") {
              return (
                <span key={indexSlice} className={styles.coloredLettersWrapper}>
                  {filter
                    .toLowerCase()
                    .split("")
                    .map((letter, indexLetter) => {
                      return <span key={indexLetter}>{letter}</span>;
                    })}
                </span>
              );
            } else {
              return <span key={indexSlice}>{sliceOfTitle}</span>;
            }
          })}
      </div>
      <div className={styles.starsWrapper}>
        {arrayOfStars.map((star, index) => {
          return (
            <AiFillStar
              aria-label="star icon"
              key={index}
              className={styles.tableRowStarGood}
            />
          );
        })}
        {restOfStars === 0
          ? null
          : restOfStars.map((star, index) => {
              return (
                <AiFillStar
                  aria-label="star icon"
                  key={index}
                  className={styles.tableRowStar}
                />
              );
            })}
      </div>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className={styles.note}>{note}</div>
      <div className={styles.iconsContainer}>
        <span
          role="button"
          className={styles.iconView}
          onClick={showTableRowInModalView}
        >
          <RxMagnifyingGlass
            aria-label="magnifying glass icon"
            className={styles.icon}
          />
        </span>
        <Link
          className={styles.iconEdit}
          to={`/dashboard/update-tvseries/${id}/${title}`}
        >
          <RxPencil1 aria-label="pencil edit icon" className={styles.icon} />
        </Link>
        <span
          role="button"
          className={styles.iconTrash}
          onClick={() => {
            toggleModalToDelete();
            selectTableRowToDelete();
          }}
        >
          <RxTrash aria-label="trash delete icon" className={styles.icon} />
        </span>
      </div>
    </div>
  );
}

export default memo(TableRow);
