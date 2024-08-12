import styles from "./modal-delete.module.scss";
import "./modal-delete.scss";
import { memo } from "react";

function ModalDelete({
  confirm,
  doNotConfirm,
  modalDeleteRef,
  toggleModalToDelete,
}) {
  return (
    <div
      ref={modalDeleteRef}
      className={`${styles.modalDelete} modalDeleteHidden`}
    >
      <article className={styles.questionAnswersWrapper}>
        <p className={styles.question}>
          Sure you want to delete the row?
          <span className={styles.questionSpan}>
            This action is irreversible
          </span>
        </p>
        <div className={styles.buttonsWrapper}>
          <button
            onClick={() => {
              confirm();
              toggleModalToDelete();
            }}
            className={`${styles.answer} ${styles.answerDeletion}`}
          >
            Delete it
          </button>
          <button
            onClick={() => {
              doNotConfirm();
              toggleModalToDelete();
            }}
            className={`${styles.answer} ${styles.answerNotDeletion}`}
          >
            Cancel
          </button>
        </div>
      </article>
    </div>
  );
}

export default memo(ModalDelete);
