// styles
import styles from "./form-paragraph.module.scss";

// react-router-dom components
import { Link } from "react-router-dom";

/**
 * FormParagraph component.
 *
 * It renders a paragraph below the form. The paragraph contains a link to allow user an easier navigation to the desired page.
 *
 * (This component is rendered below register, login, forgot password and verify password secret forms)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.paragraphText - The text content of the paragraph.
 * @param {string} props.linkText - The text of the link.
 * @param {string} props.linkHref - The url path of the link.
 *
 * @returns {JSX.Element} The rendered FormParagraph component.
 */
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
