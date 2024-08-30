import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOnlyCredentialsUser } from "../redux/features/auth/auth-slice";
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from "../redux/api/users-api-slice";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "../components/form/form";
import toast from "react-hot-toast";

export default function UpdateUserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetAll = useResetApiAndUser();
  const { data, isSuccess: dataIsAvailable } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading, isSuccess }] =
    useUpdateUserProfileMutation();

  const methods = useForm({
    defaultValues: async () => {
      let user;
      if (dataIsAvailable) {
        user = { ...data.body };
      }
      return user;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile", { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleUpdateUserData = async (data) => {
    try {
      const res = await updateUserProfile({ ...data }).unwrap();
      if (res.body) {
        toast.success(res.message);
        dispatch(
          setOnlyCredentialsUser({
            user: res.body.name,
          })
        );
      }
    } catch (err) {
      if (err.data.type === "token") {
        toast.error("Token has expired. Log in again");
        resetAll();
        return;
      }
      toast.error(err.data.message);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <Form
          typeOfForm={"update user"}
          onSubmit={handleUpdateUserData}
          formButtonProps={{
            isLoading,
            textOnLoading: "Updating...",
            text: "Update",
          }}
        />
      </FormProvider>
    </section>
  );
}
