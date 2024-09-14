import styles from "./input-password.module.scss";
import { RxEyeOpen, RxEyeNone } from "react-icons/rx";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../label/label";

/**
 * InputPassword component.
 * It renders an input field for the password.
 *
 * (The type of the input is toggled between "password" and "text" to toggle password visibility)
 *
 * (It renders the Label component too)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name used as name, default type and id of the input. Used also as label (this prop is passed to Label component too).
 * @param {string} [props.placeholder="Enter password"] - The placeholder text for the input field. Defaults to "Enter Password"
 *
 * @returns {JSX.Element} The rendered InputPassword component.
 */
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
    <div className={styles.inputPasswordWrapper}>
      <Label htmlFor={name} />
      <input
        type={inputType}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        minLength={10}
        maxLength={15}
        onDrop={(e) => e.preventDefault()}
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
