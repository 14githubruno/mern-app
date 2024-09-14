import styles from "./textarea-chars.module.scss";
import { useFormContext, useWatch } from "react-hook-form";

/**
 * TextareaChars component.
 * It renders the number of characters of Textarea component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name is used to connect this component to the one to which the number of chars needs to be counted (i.e. in this case Textarea component).
 *
 * @returns {JSX.Element} The rendered TextareaChars component.
 */
export default function TextareaChars({ name }) {
  const { control } = useFormContext();
  const chars = useWatch({ control, name: name });

  let lengthOfChars;
  if (chars && chars.length > 0) {
    lengthOfChars = chars.length;
  } else {
    lengthOfChars = 0;
  }

  return <span className={styles.textareaChars}>{lengthOfChars}/200</span>;
}
