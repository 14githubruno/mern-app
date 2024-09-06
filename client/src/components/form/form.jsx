import styles from "./form.module.scss";
import InputText from "./input-text/input-text";
import InputEmail from "./input-email/input-email";
import InputPassword from "./input-password/input-password";
import InputNumber from "./input-number/input-number";
import InputFile from "./input-file/input-file";
import Textarea from "./textarea/textarea";
import FormButton from "./form-button/form-button";
import FormLinkBack from "./form-link-back/form-link-back";
import FormParagraph from "./form-paragraph/form-paragraph";
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
          <FormParagraph
            paragraphText="Already have an akkount?"
            linkText="Log in"
            linkHref="/login"
          />
        </Fragment>
      );
      break;
    case "verify user":
      formContent = (
        <Fragment>
          <InputText name={"secret"} />
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
          <FormParagraph
            paragraphText="Don't have an akkount?"
            linkText="Register one"
            linkHref="/register"
          />
          <FormParagraph
            paragraphText="Forgot your password?"
            linkText="Rekover it"
            linkHref="/forgot-password"
          />
        </Fragment>
      );
      break;
    case "forgot password":
      formContent = (
        <Fragment>
          <InputEmail name={"email"} />
          <FormButton {...formButtonProps} />
          <FormParagraph
            paragraphText="Remember your password?"
            linkText="Log in"
            linkHref="/login"
          />
        </Fragment>
      );
      break;
    case "verify password secret":
      formContent = (
        <Fragment>
          <InputText name={"secret"} />
          <FormButton {...formButtonProps} />
          <FormParagraph
            paragraphText="Remember your password?"
            linkText="Log in"
            linkHref="/login"
          />
        </Fragment>
      );
      break;
    case "reset password":
      formContent = (
        <Fragment>
          <InputPassword name={"password"} placeholder={"Enter new password"} />
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
          <FormLinkBack linkHref={"/profile"} />
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
          <FormLinkBack linkHref={"/dashboard"} />
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
          <FormLinkBack linkHref={"/dashboard"} />
        </Fragment>
      );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {formContent}
    </form>
  );
}
