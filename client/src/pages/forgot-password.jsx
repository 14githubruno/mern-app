import { useHeadTags } from "../hooks/use-head-tags";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useForgotPasswordMutation } from "../redux/api/users-api-slice";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import Form from "../components/form/form";
import toast from "react-hot-toast";

/**
 * ForgotPassword page component.
 *
 * This page contains the form to allow user send email to reset password.
 *
 * @returns {JSX.Element} The rendered ForgotPassword page component.
 */
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });

  // this below fires a useEffect
  useHeadTags("forgotPassword");

  const handleForgotPassword = async (data) => {
    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await forgotPassword(parsedData).unwrap();
      if (res.body) {
        toast.success(res.message);
        navigate(`/verify-password-secret/${res.body.token}`, {
          replace: true,
        });
      }
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <Form
          typeOfForm={"forgot password"}
          onSubmit={handleForgotPassword}
          formButtonProps={{
            isLoading,
            textOnLoading: "Sending...",
            text: "Send",
          }}
          formParagraphArrayProps={[
            {
              paragraphText: "Remember your password?",
              linkText: "Log in",
              linkHref: "/login",
            },
          ]}
        />
      </FormProvider>
    </section>
  );
}
