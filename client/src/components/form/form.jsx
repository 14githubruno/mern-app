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

/**
 * Form component.
 * It renders all the forms of the web app.
 *
 * (It renders all the child components needed to create the form, i.e. InputEmail, InputPassword and FormButton for a login form)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.typeOfForm - The type of form to be rendered (i.e. login form, create tvseries form etc).
 * @param {function} props.onSubmit - The function to be called on form submit.
 * @param {object} props.formButtonProps - The props to be passed to FormButton component.
 * @param {object} [props.inputFileProps=null] - The props to be passed to InputFile component is provided. Defaults to null.
 * @param {Array<object>} [props.formParagraphArrayProps=[]] - Array of objects with props. Each obj has the props to be passed to a FormParagraph component instance. Defaults to empty array.
 * @param {string} [props.formLinkHrefToGoBack=""] - The link href to allow user to go back to previous page. Defaults to empty string.
 *
 * @returns {JSX.Element} The rendered Form component.
 */
export default function Form({
  typeOfForm,
  onSubmit,
  formButtonProps,
  inputFileProps = null,
  formParagraphArrayProps = [],
  formLinkHrefToGoBack = "",
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
          {formParagraphArrayProps &&
            formParagraphArrayProps.map((objWithProps) => {
              return <FormParagraph {...objWithProps} />;
            })}
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
          {formParagraphArrayProps &&
            formParagraphArrayProps.map((objWithProps) => {
              return <FormParagraph {...objWithProps} />;
            })}
        </Fragment>
      );
      break;
    case "forgot password":
      formContent = (
        <Fragment>
          <InputEmail name={"email"} />
          <FormButton {...formButtonProps} />
          {formParagraphArrayProps &&
            formParagraphArrayProps.map((objWithProps) => {
              return <FormParagraph {...objWithProps} />;
            })}
        </Fragment>
      );
      break;
    case "verify password secret":
      formContent = (
        <Fragment>
          <InputText name={"secret"} />
          <FormButton {...formButtonProps} />
          {formParagraphArrayProps &&
            formParagraphArrayProps.map((objWithProps) => {
              return <FormParagraph {...objWithProps} />;
            })}
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
          {formLinkHrefToGoBack && (
            <FormLinkBack linkHref={formLinkHrefToGoBack} />
          )}
        </Fragment>
      );
      break;
    case "verify user update":
      formContent = (
        <Fragment>
          <InputText name={"secret"} />
          <FormButton {...formButtonProps} />
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
          {formLinkHrefToGoBack && (
            <FormLinkBack linkHref={formLinkHrefToGoBack} />
          )}
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
          {formLinkHrefToGoBack && (
            <FormLinkBack linkHref={formLinkHrefToGoBack} />
          )}
        </Fragment>
      );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {formContent}
    </form>
  );
}
