import styles from "./input-number.module.scss";
import { useFormContext } from "react-hook-form";
import Label from "../label/label";

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
        {...register(name, {
          valueAsNumber: true,
        })}
      />
    </>
  );
}
