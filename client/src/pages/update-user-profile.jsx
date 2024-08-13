import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/auth-slice";
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from "../redux/api/users-api-slice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LinkBack from "../components/link-back/link-back";

export default function UpdateUserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isSuccess: dataIsAvailable } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading, isSuccess }] =
    useUpdateUserProfileMutation();

  const { register, handleSubmit } = useForm({
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
    console.log(data);
    try {
      const res = await updateUserProfile({ ...data }).unwrap();
      if (res.body) {
        toast.success(res.message);
        dispatch(
          setCredentials({ user: res.body.name, token: res.body.token })
        );
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleUpdateUserData)}>
        <label htmlFor="name">
          Name<span className="label-asterisk">*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          autoComplete="off"
          {...register("name")}
        />
        <label htmlFor="email">
          Email<span className="label-asterisk">*</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          autoComplete="off"
          {...register("email")}
        />
        <label htmlFor="password">
          Password<span className="label-asterisk">*</span>
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your current or new password"
          autoComplete="off"
          {...register("password")}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
        <LinkBack linkHref={"/profile"} />
      </form>
    </section>
  );
}
