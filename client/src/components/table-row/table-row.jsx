import styles from "./table-row.module.scss";
import { AiFillStar } from "react-icons/ai";
import { RxPencil1, RxMagnifyingGlass, RxTrash } from "react-icons/rx";
import { Link } from "react-router-dom";
import { memo } from "react";

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
  const arrayOfStars = new Array(Number(stars)).fill("*");
  const restOfStars = new Array(5 - arrayOfStars.length).fill("*");

  return (
    <div className={styles.tableRow} key={id}>
      <div className={styles.num}>{num}</div>
      <div className={styles.title}>{title}</div>
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
        aria-label={`image of ${title} tv series`}
        className={styles.image}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className={styles.note}>{note}</div>
      <div className={styles.iconsContainer}>
        <span className={styles.iconView} onClick={showTableRowInModalView}>
          <RxMagnifyingGlass
            aria-label="magnifying glass icon"
            className={styles.icon}
          />
        </span>
        <Link
          className={styles.iconEdit}
          to={`/dashboard/update-tvseries/${id}`}
        >
          <RxPencil1 aria-label="pencil edit icon" className={styles.icon} />
        </Link>
        <span
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
