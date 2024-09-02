import { useFormContext } from "react-hook-form";
import Label from "../label/label";

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
        {...register(name)}
      />
    </>
  );
}
