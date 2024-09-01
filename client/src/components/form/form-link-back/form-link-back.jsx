import styles from "./form-link-back.module.scss";
import { Link } from "react-router-dom";

// Note: for now, this component is used only in forms (not register or login forms);

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
