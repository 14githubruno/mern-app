import styles from "./home-heading-one.module.scss";
import { GiNoodles } from "react-icons/gi";
import { RiKnifeBloodLine } from "react-icons/ri";

export default function HomeHeadingOne() {
  const headingOne = "Reakt Applikation";

  return (
    <header>
      <h1 className={styles.homeHeadingOne}>
        {headingOne.split("").map((letter, index) => {
          const space = " ";
          const k = "k";
          if (letter === space) return " ";
          else
            return (
              <span
                key={index}
                className={`${styles.letter} ${
                  letter === k ? styles.kLetter : ""
                }`}
              >
                {letter}
              </span>
            );
        })}
        <span>
          <GiNoodles
            className={`${styles.homeHeadingOneIcon} ${styles.noodlesIcon}`}
          />
          <RiKnifeBloodLine
            className={`${styles.homeHeadingOneIcon} ${styles.knifeBloodIcon}`}
          />
        </span>
      </h1>
    </header>
  );
}
