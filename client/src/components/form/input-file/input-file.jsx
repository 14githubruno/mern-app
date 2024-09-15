import styles from "./input-file.module.scss";
import { useFormContext } from "react-hook-form";
import Label from "../label/label";

/**
 * InputFile component.
 *
 * It renders an input field for uploading files.
 *
 * (It renders the Label component too)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.typeOfFile - The type of file to accept (i.e. "image"). This prop is passed to Label component too.
 * @param {string} props.file - The URL of the uploaded file (i.e. if user has uploaded the image, it gets displayed).
 * @param {function} props.funcForInputFile - A function to grab the uploaded file.
 *
 * @returns {JSX.Element} The rendered InputFile component.
 */
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
