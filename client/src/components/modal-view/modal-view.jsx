import styles from "./modal-view.module.scss";
import { AiFillStar } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { memo } from "react";

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
            return <AiFillStar key={index} className={styles.cardStarGood} />;
          })}
          {restOfStars === 0
            ? null
            : restOfStars.map((star, index) => {
                return (
                  <AiFillStar
                    key={index + arrayOfStars.length}
                    className={styles.cardStar}
                  />
                );
              })}
        </div>
        <p className={styles.parag}>{note}</p>
        <LiaTimesSolid className={styles.closeBtn} onClick={closeModalView} />
      </div>
    </article>
  );
}

export default memo(ModalView);
