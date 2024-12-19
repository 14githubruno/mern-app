// components
import Form from "../components/form/form";

// react
import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "../redux/api/api-slice";
import {
  useVerifyUserMutation,
  useVerifyTokenQuery,
} from "../redux/api/users-api-slice";

// react-router-dom lib
import { useParams, useNavigate } from "react-router-dom";

// react-hook-form lib
import { useForm, FormProvider } from "react-hook-form";

// lib
import { useHeadTags } from "../hooks/use-head-tags";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";

// other pkgs
import toast from "react-hot-toast";

/**
 * VerifyUser page component.
 *
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
  const user = useSelector((state) => state.auth.user);
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
      sekret: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/profile");
      toast.error("You are already logged in");
    }
  }, [user]);

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
      const symbol = { token: params.token, secret: parsedData.sekret };
      const res = await verifyUser(symbol).unwrap();
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
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
