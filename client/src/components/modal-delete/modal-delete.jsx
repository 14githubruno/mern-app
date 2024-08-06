import styles from "./modal-delete.module.scss";
import "./modal-delete.scss";

export default function ModalDelete({
  confirm,
  doNotConfirm,
  modalRef,
  toggleModalToDelete,
}) {
  return (
    <div ref={modalRef} className={`${styles.modal} modalHidden`}>
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
