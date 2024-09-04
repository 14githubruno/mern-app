import { useHeadTags } from "../hooks/use-head-tags";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import {
  useVerifyTokenQuery,
  useVerifyUserMutation,
} from "../redux/api/users-api-slice";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import Form from "../components/form/form";
import toast from "react-hot-toast";

export default function VerifyUser() {
  const navigate = useNavigate();
  const params = useParams();
  const { error } = useVerifyTokenQuery(params.token);
  const [verifyUser, { isLoading, isSuccess }] = useVerifyUserMutation();

  const methods = useForm({
    defaultValues: {
      secret: "",
    },
  });

  useEffect(() => {
    if (error) {
      navigate("/", { replace: true });
      toast.error(error.data.message);
    } else if (isSuccess) {
      navigate("/login", { replace: true });
    }
  }, [error, isSuccess, navigate]);

  // this below fires a useEffect
  useHeadTags("verify");

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
