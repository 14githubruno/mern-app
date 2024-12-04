// styles
import styles from "./form-link-back.module.scss";

// react-router-dom components
import { Link } from "react-router-dom";

/**
 * FormLinkBack component.
 *
 * It renders a link that redirects the user back to the previous page.
 *
 * (This component is not used in register or login forms)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.linkHref - The URL of the previous page to redirect the user to.
 *
 * @returns {JSX.Element} The rendered FormLinkBack component.
 */
export default function FormLinkBack({ linkHref }) {
  return (
    <Link
      aria-label="link to previous page"
      className={styles.formLinkBack}
      to={linkHref}
    >
      &larr; back
    </Link>
  );
}
