// styles
import styles from "./input-number.module.scss";

// components
import Label from "../label/label";

// react-hook-form lib
import { useFormContext } from "react-hook-form";

/**
 * InputNumber component.
 *
 * It renders an input field for numbers.
 *
 * (It renders the Label component too)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name used as name and id of the input. Used also as label (this prop is passed to Label component too).
 * @param {string} props.placeholder - The placeholder text for the input field.
 *
 * @returns {JSX.Element} The rendered InputNumber component.
 */
export default function InputNumber({ name, placeholder }) {
  const { register } = useFormContext();

  return (
    <>
      <Label htmlFor={name} />
      <input
        className={styles.inputNumber}
        type="number"
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        onDrop={(e) => e.preventDefault()}
        {...register(name, {
          valueAsNumber: true,
        })}
      />
    </>
  );
}
