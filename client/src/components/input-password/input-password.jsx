import styles from "./input-password.module.scss";
import { RxEyeOpen, RxEyeNone } from "react-icons/rx";
import { IoHelp } from "react-icons/io5";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function InputPassword({ placeholder }) {
  const [inputType, setInputType] = useState("password");
  const { register, watch } = useFormContext();
  const inputValue = watch("password");

  function togglePasswordVisibility() {
    setInputType(inputType === "password" ? "text" : "password");
  }

  return (
    <>
      <label htmlFor="password">
        Password
        <span className="label-asterisk">*</span>
        <span className={styles.passwordTooltipWrapper}>
          <IoHelp />
          <span className={styles.passwordTooltip}>
            Password must be between 10 and 15 characters long and contain at
            least one uppercase letter, one number and one special character
            among: !#$%&?"
          </span>
        </span>
      </label>
      <input
        type={inputType}
        id="password"
        placeholder={placeholder}
        autoComplete="off"
        minLength={10}
        maxLength={15}
        {...register("password")}
      />
      {inputValue?.length > 0 && (
        <span
          aria-label="Toggle password visibility"
          className={styles.eyeIcon}
          onClick={togglePasswordVisibility}
        >
          {inputType === "password" ? <RxEyeOpen /> : <RxEyeNone />}
        </span>
      )}
    </>
  );
}
