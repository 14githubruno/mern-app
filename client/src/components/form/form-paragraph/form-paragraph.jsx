import { Link } from "react-router-dom";
import styles from "./form-paragraph.module.scss";

// Note: this component will be rendered only in login and register forms

export default function FormParagraph({ paragraphText, linkText, linkHref }) {
  return (
    <p className={styles.formParagraph}>
      {paragraphText}{" "}
      <span>
        <Link className={styles.link} to={linkHref}>
          {linkText}
        </Link>
      </span>
    </p>
  );
}
