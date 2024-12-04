// components
import Form from "../components/form/form";

// react lib
import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { apiSlice } from "../redux/api/api-slice";
import {
  useResetPasswordMutation,
  useVerifyTokenQuery,
} from "../redux/api/users-api-slice";

// react-router-dom lib
import { useParams, useNavigate } from "react-router-dom";

// react-hook-form lib
import { useForm, FormProvider } from "react-hook-form";

// lib
import { useHeadTags } from "../hooks/use-head-tags";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";

// pkgs
import toast from "react-hot-toast";

/**
 * ResetPassword page component.
 *
 * This page contains the form to allow user to complete password reset.
 *
 * @returns {JSX.Element} The rendered ResetPassword page component.
 */
export default function ResetPassword() {
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
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const methods = useForm({
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login", { replace: true });
    } else if (checkError) {
      toast.error(checkError.data.message);
      navigate("/login", { replace: true });
    }
  }, [checkError, isSuccess, navigate]);

  // this below fires a useEffect
  useHeadTags("resetPassword");

  const handleResetPassword = async (data) => {
    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const symbolAndPassword = {
        token: params.token,
        password: parsedData.password,
      };
      const res = await resetPassword(symbolAndPassword).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <Form
          typeOfForm={"reset password"}
          onSubmit={handleResetPassword}
          formButtonProps={{
            isLoading,
            textOnLoading: "Resetting...",
            text: "Reset",
          }}
        />
      </FormProvider>
    </section>
  );
}
