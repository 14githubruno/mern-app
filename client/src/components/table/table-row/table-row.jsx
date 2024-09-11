import styles from "./table-row.module.scss";
import { AiFillStar } from "react-icons/ai";
import { RxPencil1, RxMagnifyingGlass, RxTrash } from "react-icons/rx";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

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
          .replace(filter, "*")
          .split("")
          .map((sliceOfTitle, indexSlice) => {
            if (sliceOfTitle === "*") {
              return (
                <span className={styles.coloredLettersWrapper}>
                  {filter.split("").map((letter, indexLetter) => {
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
