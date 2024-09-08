import { useFormContext } from "react-hook-form";
import Label from "../label/label";

export default function InputText({ name }) {
  const { register } = useFormContext();

  return (
    <>
      <Label htmlFor={name} />
      <input
        type="text"
        id={name}
        placeholder={`Enter ${name}`}
        autoComplete="off"
        onDrop={(e) => e.preventDefault()}
        {...register(name)}
      />
    </>
  );
}
