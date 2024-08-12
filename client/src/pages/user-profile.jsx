import {
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,
} from "../redux/api/users-api-slice";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/features/auth/auth-slice";
import { resetTvseries } from "../redux/features/tvseries/tvseries-slice";
import { apiSlice } from "../redux/api/api-slice";
import { useCallback } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader/loader";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetUserProfileQuery();
  const [deleteUserProfile] = useDeleteUserProfileMutation();

  const handleDeleteUserProfile = useCallback(async (user) => {
    try {
      const res = await deleteUserProfile(user).unwrap();
      if (res.message) {
        toast.success(res.message);
        dispatch(clearCredentials());
        dispatch(resetTvseries());
        dispatch(apiSlice.util.resetApiState());
      }
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  if (isSuccess) {
    content = (
      <section style={{ color: "whitesmoke" }}>
        <p>{data.body.name}</p>
        <p>{data.body.email}</p>
        <button onClick={() => handleDeleteUserProfile(data?.body)}>
          Delete user
        </button>
      </section>
    );
  }

  return content;
}
