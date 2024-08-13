import styles from "./modal-delete.module.scss";
import "./modal-delete.scss";
import { memo } from "react";

function ModalDelete({
  isUser = false,
  nameOfItemToDelete,
  confirm,
  doNotConfirm = () => {},
  modalDeleteRef,
  toggleModalToDelete,
}) {
  let what_to_delete = isUser ? "user" : "table row";
  let question = isUser
    ? "Are you sure you want to delete your akkount? All your tvseries will be deleted too"
    : "Are you sure you want to delete this table row?";

  return (
    <div
      ref={modalDeleteRef}
      className={`${styles.modalDelete} modalDeleteHidden`}
    >
      <article className={styles.paragraphsButtonsContainer}>
        <p className={styles.paragraph}>
          Name of {what_to_delete} to delete:{" "}
          <span className={styles.nameOfItemToDelete}>
            {nameOfItemToDelete}
          </span>
        </p>
        <p className={styles.paragraph}>{question}</p>
        <p className={styles.paragraph}>This aktion is irreversible</p>
        <div className={styles.buttonsWrapper}>
          <button
            onClick={() => {
              confirm();
              toggleModalToDelete();
            }}
            className={`${styles.button} ${styles.buttonDeletion}`}
          >
            Delete
          </button>
          <button
            onClick={() => {
              doNotConfirm();
              toggleModalToDelete();
            }}
            className={`${styles.button} ${styles.buttonNotDeletion}`}
          >
            Kancel
          </button>
        </div>
      </article>
    </div>
  );
}

export default memo(ModalDelete);
