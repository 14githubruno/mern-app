import { useFormContext } from "react-hook-form";
import Label from "../label/label";

/**
 * InputEmail component.
 * It renders an input field for email addresses.
 *
 * (It renders the Label component too)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name used as type, name and id of the input. Used also in its placeholder. Used also as label (this prop is passed to Label component too).
 *
 * @returns {JSX.Element} The rendered InputEmail component.
 */
export default function InputEmail({ name }) {
  const { register } = useFormContext();

  return (
    <>
      <Label htmlFor={name} />
      <input
        type={name}
        id={name}
        placeholder={`Enter ${name}`}
        autoComplete="off"
        onDrop={(e) => e.preventDefault()}
        {...register(name)}
      />
    </>
  );
}
