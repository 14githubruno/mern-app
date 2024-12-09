// components
import Form from "../components/form/form";
import Loader from "../components/loader/loader";

// react
import { useEffect } from "react";

// redux
import { useSelector } from "react-redux";
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from "../redux/api/users-api-slice";

// react-router-dom lib
import { useNavigate } from "react-router-dom";

// react-hook-form lib
import { useForm, FormProvider } from "react-hook-form";

// lib/hooks
import { useHeadTags } from "../hooks/use-head-tags";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";

// other pkgs
import toast from "react-hot-toast";

/**
 * UpdateUserProfile page component.
 *
 * Here user can modify personal data such as name, email and password.
 *
 * @returns {JSX.Element} The rendered UpdateUserProfile page component.
 */
export default function UpdateUserProfile() {
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
  }, [data, methods.reset]);

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
        toast.success(res.message);
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
            formLinkHrefToGoBack="/profile"
          />
        </FormProvider>
      ) : (
        <Loader />
      )}
    </section>
  );
}
