import styles from "./textarea.module.scss";
import { useFormContext } from "react-hook-form";
import Label from "../label/label";
import TextareaChars from "../textarea-chars/textarea-chars";

export default function Textarea() {
  const { register } = useFormContext();

  return (
    <>
      <Label htmlFor={"note"} />
      <textarea
        className={styles.textarea}
        id="note"
        placeholder="Enter note"
        autoComplete="off"
        maxLength={200}
        onDrop={(e) => e.preventDefault()}
        {...register("note")}
      />
      <TextareaChars name={"note"} />
    </>
  );
}
