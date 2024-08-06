import styles from "./table-row.module.scss";
import { AiFillStar } from "react-icons/ai";
import { RxPencil1, RxMagnifyingGlass, RxTrash } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function TableRow({
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
          return <AiFillStar key={index} className={styles.tableRowStarGood} />;
        })}
        {restOfStars === 0
          ? null
          : restOfStars.map((star, index) => {
              return <AiFillStar key={index} className={styles.tableRowStar} />;
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
        <span className={styles.iconView} onClick={showTableRowInModalView}>
          <RxMagnifyingGlass className={styles.icon} />
        </span>
        <Link
          className={styles.iconEdit}
          to={`/dashboard/update-tvseries/${id}`}
        >
          <RxPencil1 className={styles.icon} />
        </Link>
        <span
          className={styles.iconTrash}
          onClick={() => {
            toggleModalToDelete();
            selectTableRowToDelete();
          }}
        >
          <RxTrash className={styles.icon} />
        </span>
      </div>
    </div>
  );
}
