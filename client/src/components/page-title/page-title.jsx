// styles
import styles from "./page-title.module.scss";

/**
 * PageTitle component.
 *
 * Renders a page title (h1) within a header.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title text to display.
 * @param {boolean} [props.pageHasForm=true] - Determines if the page containing the title also has a form. Defaults to `true`.
 * @returns {JSX.Element} The rendered PageTitle component.
 *
 * @note This component is not used for the homepage title.
 */
export default function PageTitle({ title, pageHasForm = true }) {
  return (
    <header
      className={`${styles.pageTitleWrapper} ${!pageHasForm ? styles.pageTitleWrapperWithoutForm : ""}`}
    >
      <h1 className={styles.pageTitle}>{title}</h1>
    </header>
  );
}
