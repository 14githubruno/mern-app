import styles from "./home-heading-one.module.scss";
import { GiNoodles } from "react-icons/gi";
import { RiKnifeBloodLine } from "react-icons/ri";

export default function HomeHeadingOne() {
  return (
    <h1 className={styles.homeHeadingOne}>
      Rea<span className={styles.kLetter}>k</span>t Appli
      <span className={styles.kLetter}>k</span>ation
      <span>
        <GiNoodles
          className={`${styles.homeHeadingOneIcon} ${styles.noodlesIcon}`}
        />
        <RiKnifeBloodLine
          className={`${styles.homeHeadingOneIcon} ${styles.knifeBloodIcon}`}
        />
      </span>
    </h1>
  );
}
