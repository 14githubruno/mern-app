import styles from "./form-button.module.scss";

/**
 * FormButton component.
 * It renders the button of the form.
 *
 * (The button has different text content depending on whether a fetching request is being made.
 * If a fetching request is in progress, the button is temporarily disabled)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isLoading - Indicates if the fetching request is being made.
 * @param {string} props.textOnLoading - Text to display while fetching.
 * @param {string} props.text - Text to display when not fetching.
 *
 * @returns {JSX.Element} The rendered FormButton component.
 */
export default function FormButton({ isLoading, textOnLoading, text }) {
  return (
    <button type="submit" className={styles.formButton} disabled={isLoading}>
      {isLoading ? textOnLoading : text}
    </button>
  );
}
