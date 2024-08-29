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
import toast from "react-hot-toast";
import InputPassword from "../components/input-password/input-password";
import LinkBack from "../components/link-back/link-back";

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
        <form onSubmit={methods.handleSubmit(handleUpdateUserData)}>
          <label htmlFor="name">
            Name<span className="label-asterisk">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            autoComplete="off"
            {...methods.register("name")}
          />
          <label htmlFor="email">
            Email<span className="label-asterisk">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            autoComplete="off"
            {...methods.register("email")}
          />
          <InputPassword placeholder={"Enter your current or new password"} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
          <LinkBack linkHref={"/profile"} />
        </form>
      </FormProvider>
    </section>
  );
}
