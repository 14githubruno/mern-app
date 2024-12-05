// styles
import styles from "./home-television.module.scss";
import "./home-television.scss";

// components
import Carousel from "../carousel/carousel";

/**
 * HomeTelevision component.
 *
 * It renders a television figure with a carousel displaying images on the "screen".
 *
 * (It renders the Carousel component)
 *
 * @param {Object} props - Properties passed to the component.
 * @param {Array<object>} props.carouselImages - An array of image objects to be passed to Carousel component. Each object has URL and alt text.
 *
 * @returns {JSX.Element} The rendered HomeTelevision component.
 */
export default function HomeTelevision({ carouselImages }) {
  return (
    <div role="figure" className={styles.homeTelevision}>
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
