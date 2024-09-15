import { useHeadTags } from "../hooks/use-head-tags";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import {
  useVerifyUpdateUserProfileMutation,
  useVerifyTokenQuery,
} from "../redux/api/users-api-slice";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import { apiSlice } from "../redux/api/api-slice";
import { useDispatch } from "react-redux";
import Form from "../components/form/form";
import toast from "react-hot-toast";

/**
 * VerifyUpdateUserProfile page component.
 *
 * This page allows user to confirm personal data update performed through the UpdateUserProfile page.
 *
 * (After having updated personal data through UpdateUserProfile page form, user receives a secret code
 * to the new/same email of the account. The code needs to be sent back to confirm the update: here user can
 * perform the latter. Also param token will be used to confirm the update.)
 *
 * @returns {JSX.Element} The rendered VerifyUpdateUserProfile page component.
 */
export default function VerifyUpdateUserProfile() {
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
  const [verifyUpdateUserProfile, { isLoading, isSuccess }] =
    useVerifyUpdateUserProfileMutation();

  const methods = useForm({
    defaultValues: {
      secret: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile", { replace: true });
    } else if (checkError) {
      navigate("/error", { replace: true });
    }
  }, [checkError, isSuccess, navigate]);

  // this below fires a useEffect
  useHeadTags("verifyUpdateUserProfile");

  const handleUserUpdateVerification = async (data) => {
    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const symbol = { token: params.token, secret: parsedData.secret };
      const res = await verifyUpdateUserProfile(symbol).unwrap();
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <Form
          typeOfForm={"verify user update"}
          onSubmit={handleUserUpdateVerification}
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
