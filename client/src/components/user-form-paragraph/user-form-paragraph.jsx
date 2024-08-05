import { Link } from "react-router-dom";
import styles from "./user-form-paragraph.module.scss";

export default function UserFormParagraph({
  paragraphText,
  linkText,
  linkHref,
}) {
  return (
    <p className={styles.userFormParagraph}>
      {paragraphText}{" "}
      <span>
        <Link className={styles.link} to={linkHref}>
          {linkText}
        </Link>
      </span>
    </p>
  );
}
