import { useHeadTags } from "../hooks/use-head-tags";
import { useDispatch } from "react-redux";
import { setOnlyCredentialsUser } from "../redux/features/auth/auth-slice";
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from "../redux/api/users-api-slice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import Form from "../components/form/form";
import Loader from "../components/loader/loader";
import toast from "react-hot-toast";

export default function UpdateUserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetAll = useResetApiAndUser();
  const user = useSelector((state) => state.auth.user);
  const { data } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const methods = useForm();

  useEffect(() => {
    if (data) {
      methods.reset({ ...data.body });
    }
  }, [data, methods]);

  // this below fires a useEffect
  useHeadTags("updateUserProfile", user);

  const handleUpdateUserData = async (data) => {
    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await updateUserProfile(parsedData).unwrap();
      if (res.body) {
        dispatch(
          setOnlyCredentialsUser({
            user: res.body.name,
          })
        );
      }

      if (!res.body.token) {
        toast.success(res.message);
        navigate("/profile", { replace: true });
      } else {
        navigate(`/profile/update-user/verify/${res.body.token}`, {
          replace: true,
        });
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
      {data ? (
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
      ) : (
        <Loader />
      )}
    </section>
  );
}
