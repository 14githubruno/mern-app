import styles from "./textarea-chars.module.scss";
import { useFormContext, useWatch } from "react-hook-form";

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
