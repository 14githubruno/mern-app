import styles from "./input-file.module.scss";
import { useFormContext } from "react-hook-form";
import Label from "../label/label";

export default function InputFile({ typeOfFile, file, funcForInputFile }) {
  const { register } = useFormContext();

  return (
    <div className={styles.inputFileWrapper}>
      <Label htmlFor={typeOfFile} />
      <input
        className={styles.inputFile}
        type="file"
        id={typeOfFile}
        accept={`${typeOfFile}/*`}
        {...register(typeOfFile, {
          onChange: (e) => {
            funcForInputFile(e);
          },
        })}
      />
      {file && (
        <img className={styles.uploadedImg} src={file} alt="uploaded image" />
      )}
    </div>
  );
}
