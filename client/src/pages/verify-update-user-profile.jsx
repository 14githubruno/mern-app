import { useHeadTags } from "../hooks/use-head-tags";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useVerifyUpdateUserProfileMutation } from "../redux/api/users-api-slice";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import Form from "../components/form/form";
import toast from "react-hot-toast";

export default function VerifyUpdateUserProfile() {
  const navigate = useNavigate();
  const params = useParams();
  const [verifyUpdateUserProfile, { isLoading, isSuccess, error }] =
    useVerifyUpdateUserProfileMutation();

  const methods = useForm({
    defaultValues: {
      secret: "",
    },
  });

  useEffect(() => {
    if (error) {
      navigate("/", { replace: true });
    } else if (isSuccess) {
      navigate("/profile", { replace: true });
    }
  }, [error, isSuccess, navigate]);

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
