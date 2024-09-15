import { useHeadTags } from "../hooks/use-head-tags";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import {
  useVerifyPasswordSecretMutation,
  useVerifyTokenQuery,
} from "../redux/api/users-api-slice";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import { apiSlice } from "../redux/api/api-slice";
import { useDispatch } from "react-redux";
import Form from "../components/form/form";
import toast from "react-hot-toast";

/**
 * VerifyPasswordSecret page component.
 * This page contains the form to allow user to send back the secret code sent by the web app.
 *
 * (After having sent the email through ForgotPassword page form, user receives
 * a secret code to that email, if valid, to be sent back. In this page user can perform the latter: then, if there is a match between codes [and tokens, handled through params],
 * user is redirected to ResetPassword page to complete the password reset.
 *
 * @returns {JSX.Element} The rendered VerifyPasswordSecret page component.
 */
export default function VerifyPasswordSecret() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { error: checkError } = useVerifyTokenQuery(params.token, {
    selectFromResult: (result) => {
      if (!result.status === "fulfilled") {
        dispatch(apiSlice.util.resetApiState());
      }
      return result;
    },
  });
  const [verifyPasswordSecret, { isLoading }] =
    useVerifyPasswordSecretMutation();

  const methods = useForm({
    defaultValues: {
      secret: "",
    },
  });

  useEffect(() => {
    if (checkError) {
      navigate("/error", { replace: true });
    }
  }, [checkError, navigate]);

  // this below fires a useEffect
  useHeadTags("verifyPasswordSecret");

  const handlePasswordSecretVerification = async (data) => {
    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const symbol = { token: params.token, secret: parsedData.secret };
      const res = await verifyPasswordSecret(symbol).unwrap();
      toast.success(res?.message);
      navigate(`/reset-password/${res.body.token}`, { replace: true });
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <Form
          typeOfForm={"verify password secret"}
          onSubmit={handlePasswordSecretVerification}
          formButtonProps={{
            isLoading,
            textOnLoading: "Verifying...",
            text: "Verify",
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
