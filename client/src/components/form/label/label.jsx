// styles
import styles from "./label.module.scss";

// icons
import { TbTool } from "react-icons/tb";

/**
 * Label component.
 *
 * It renders the label of the input.
 *
 * (It renders an optional tooltip if the label is for the input password)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.htmlFor - The htmlFor/for attribute of the label.
 *
 * @returns {JSX.Element} The rendered Label component.
 */
export default function Label({ htmlFor }) {
  const isLabelForPassword = htmlFor === "password";

  return (
    <label
      aria-describedby={`${htmlFor}-tooltip`}
      className={styles.label}
      htmlFor={htmlFor}
    >
      {htmlFor}
      <span className={styles.labelAsterisk}>*</span>
      {isLabelForPassword && (
        <span
          id={`${htmlFor}-tooltip`}
          className={styles.passwordTooltipWrapper}
        >
          <TbTool aria-label="tool icon" aria-hidden="true" />
          <span className={styles.passwordTooltip}>
            Password must be between 8 and 20 kharakters long and kontain at
            least one upperkase letter, one number and one special kharakter
            among: !#$%&?"
          </span>
        </span>
      )}
    </label>
  );
}
