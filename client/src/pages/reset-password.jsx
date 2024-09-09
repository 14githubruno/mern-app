import { useHeadTags } from "../hooks/use-head-tags";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import {
  useResetPasswordMutation,
  useVerifyTokenQuery,
} from "../redux/api/users-api-slice";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import { apiSlice } from "../redux/api/api-slice";
import { useDispatch } from "react-redux";
import Form from "../components/form/form";
import toast from "react-hot-toast";

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
  const [resetPassword, { error, isLoading, isSuccess }] =
    useResetPasswordMutation();

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
    } else if (error) {
      navigate("/", { replace: true });
    }
  }, [checkError, error, isSuccess, navigate]);

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
