import styles from "./label.module.scss";
import { TbTool } from "react-icons/tb";

export default function Label({ htmlFor, file = null }) {
  const isLabelForPassword = htmlFor === "password";
  const isLabelForImage = htmlFor === "image";

  let content_nested_in_label;

  if (isLabelForPassword) {
    content_nested_in_label = (
      <span id={`${htmlFor}-tooltip`} className={styles.passwordTooltipWrapper}>
        <TbTool aria-label="tool icon" aria-hidden="true" />
        <span className={styles.passwordTooltip}>
          Password must be between 10 and 15 characters long and contain at
          least one uppercase letter, one number and one special character
          among: !#$%&?"
        </span>
      </span>
    );
  }

  if (isLabelForImage && file) {
    content_nested_in_label = (
      <img className={styles.uploadedImg} src={file} alt="uploaded image" />
    );
  }

  return (
    <label
      aria-describedby={`${htmlFor}-tooltip`}
      className={styles.label}
      htmlFor={htmlFor}
    >
      {htmlFor}
      <span className={styles.labelAsterisk}>*</span>
      {content_nested_in_label}
    </label>
  );
}
