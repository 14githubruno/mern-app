import styles from "./input-password.module.scss";
import { RxEyeOpen, RxEyeNone } from "react-icons/rx";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../label/label";

export default function InputPassword({
  name,
  placeholder = "Enter password",
}) {
  const [inputType, setInputType] = useState(name);
  const { register, watch } = useFormContext();
  const inputValue = watch(name);

  function togglePasswordVisibility() {
    setInputType(inputType === name ? "text" : name);
  }

  return (
    <div className={styles.inputPassword}>
      <Label htmlFor={name} />
      <input
        type={inputType}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        maxLength={15}
        {...register(name)}
      />
      {inputValue?.length > 0 && (
        <span
          aria-label="Toggle password visibility"
          className={styles.eyeIcon}
          onClick={togglePasswordVisibility}
        >
          {inputType === name ? <RxEyeOpen /> : <RxEyeNone />}
        </span>
      )}
    </div>
  );
}
