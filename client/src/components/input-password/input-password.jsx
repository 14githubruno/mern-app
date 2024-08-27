import styles from "./input-password.module.scss";
import { RxEyeOpen, RxEyeNone } from "react-icons/rx";
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
        Password<span className="label-asterisk">*</span>
      </label>
      <input
        type={inputType}
        id="password"
        placeholder={placeholder}
        autoComplete="off"
        maxLength={10}
        {...register("password")}
      />
      {inputValue?.length > 0 && (
        <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
          {inputType === "password" ? <RxEyeOpen /> : <RxEyeNone />}
        </span>
      )}
    </>
  );
}
