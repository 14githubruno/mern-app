import styles from "./form.module.scss";
import InputText from "./input-text/input-text";
import InputEmail from "./input-email/input-email";
import InputPassword from "./input-password/input-password";
import InputNumber from "./input-number/input-number";
import InputFile from "./input-file/input-file";
import Textarea from "./textarea/textarea";
import FormButton from "./form-button/form-button";
import LinkBack from "../link-back/link-back";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react";

export default function Form({
  typeOfForm,
  onSubmit,
  inputFileProps = null,
  formButtonProps,
}) {
  const { handleSubmit } = useFormContext();

  let formContent;
  switch (typeOfForm) {
    case "register user":
      formContent = (
        <Fragment>
          <InputText name={"name"} />
          <InputEmail name={"email"} />
          <InputPassword name={"password"} />
          <FormButton {...formButtonProps} />
        </Fragment>
      );
      break;
    case "login user":
      formContent = (
        <Fragment>
          <InputEmail name={"email"} />
          <InputPassword name={"password"} />
          <FormButton {...formButtonProps} />
        </Fragment>
      );
      break;
    case "update user":
      formContent = (
        <Fragment>
          <InputText name={"name"} />
          <InputEmail name={"email"} />
          <InputPassword
            name={"password"}
            placeholder={"Enter current or new password"}
          />
          <FormButton {...formButtonProps} />
          <LinkBack linkHref={"/profile"} />
        </Fragment>
      );
      break;
    case "create tvseries":
      formContent = (
        <Fragment>
          <InputText name={"title"} />
          <InputNumber name={"stars"} placeholder={"Enter number (1-5)"} />
          <InputFile {...inputFileProps} />
          <Textarea />
          <FormButton {...formButtonProps} />
          <LinkBack linkHref={"/dashboard"} />
        </Fragment>
      );
    case "update tvseries":
      formContent = (
        <Fragment>
          <InputText name={"title"} />
          <InputNumber name={"stars"} placeholder={"Enter number (1-5)"} />
          <InputFile {...inputFileProps} />
          <Textarea />
          <FormButton {...formButtonProps} />
          <LinkBack linkHref={"/dashboard"} />
        </Fragment>
      );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {formContent}
    </form>
  );
}
