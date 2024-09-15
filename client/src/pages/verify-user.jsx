import { useHeadTags } from "../hooks/use-head-tags";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import {
  useVerifyUserMutation,
  useVerifyTokenQuery,
} from "../redux/api/users-api-slice";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import { apiSlice } from "../redux/api/api-slice";
import { useDispatch } from "react-redux";
import Form from "../components/form/form";
import toast from "react-hot-toast";

/**
 * VerifyUser page component.
 * This page allows user to confirm and verify the personal account after registration.
 *
 * (User can register a new account through Register page, and after registration would receive a secret code
 * to the email provided. The code needs to be sent back to verify the account: only then, the user could
 * log in the web app. In this page user can perform the account verification)
 *
 * @returns {JSX.Element} The rendered VerifyUser page component.
 */
export default function VerifyUser() {
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
  const [verifyUser, { isLoading, isSuccess }] = useVerifyUserMutation();

  const methods = useForm({
    defaultValues: {
      secret: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login", { replace: true });
    } else if (checkError) {
      navigate("/error", { replace: true });
    }
  }, [checkError, isSuccess, navigate]);

  // this below fires a useEffect
  useHeadTags("verifyUser");

  const handleUserVerification = async (data) => {
    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const symbol = { token: params.token, secret: parsedData.secret };
      const res = await verifyUser(symbol).unwrap();
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <Form
          typeOfForm={"verify user"}
          onSubmit={handleUserVerification}
          formButtonProps={{
            isLoading,
            textOnLoading: "Verifying...",
            text: "Verify",
          }}
        />
      </FormProvider>
    </section>
  );
}
