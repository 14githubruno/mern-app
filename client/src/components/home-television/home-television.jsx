import styles from "./home-television.module.scss";
import "./home-television.scss";
import Carousel from "../carousel/carousel";

// This icon below has been rebuilt and customized to be used with the carousel
// import { PiTelevisionThin } from "react-icons/pi";

export default function HomeTelevision({ carouselImages }) {
  return (
    <div className={styles.homeTelevision}>
      <div className={styles.aerials}>
        <div className={`${styles.aerial} ${styles.aerialLeft}`}></div>
        <div className={`${styles.aerial} ${styles.aerialRight}`}></div>
      </div>
      <div className={`${styles.tv} tv`}>
        <div className={`${styles.screen} screen`}>
          <Carousel images={carouselImages} />
        </div>
        <div className={styles.carouselButtonsContainer}>
          {/* this container is only graphic. Carousel buttons are in Carousel component */}
        </div>
      </div>
    </div>
  );
}
