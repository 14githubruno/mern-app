// styles
import styles from "./modal-view.module.scss";

// icons
import { AiFillStar } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";

// react lib
import { memo } from "react";

/**
 * ModalView component.
 *
 * It renders a modal view.
 *
 * (The component is used to display a single tvseries in a modal)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the tvseries.
 * @param {number} props.stars - The star rating of the tvseries.
 * @param {string} props.image - The URL of the tvseries image.
 * @param {string} props.note - The note on the tvseries.
 * @param {function} props.closeModalView - A function to close the modal view.
 *
 * @returns {JSX.Element} The rendered ModalView component.
 */
function ModalView({ title, stars, image, note, closeModalView }) {
  const arrayOfStars = new Array(Number(stars)).fill("*");
  const restOfStars = new Array(5 - Number(stars)).fill("*");

  return (
    <article className={styles.modalView}>
      <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        <img className={styles.image} src={image} />
        <div className={styles.starsContainer}>
          {arrayOfStars.map((star, index) => {
            return (
              <AiFillStar
                aria-label="star icon"
                key={index}
                className={styles.cardStarGood}
              />
            );
          })}
          {restOfStars === 0
            ? null
            : restOfStars.map((star, index) => {
                return (
                  <AiFillStar
                    aria-label="star icon"
                    key={index + arrayOfStars.length}
                    className={styles.cardStar}
                  />
                );
              })}
        </div>
        <p className={styles.parag}>{note}</p>
        <LiaTimesSolid
          aria-label="close button icon"
          className={styles.closeBtn}
          onClick={closeModalView}
        />
      </div>
    </article>
  );
}

export default memo(ModalView);
