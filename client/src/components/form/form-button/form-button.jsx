import styles from "./form-button.module.scss";

export default function FormButton({ isLoading, textOnLoading, text }) {
  return (
    <button type="submit" className={styles.formButton} disabled={isLoading}>
      {isLoading ? textOnLoading : text}
    </button>
  );
}
