// redux lib
import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/features/auth/auth-slice";
import { resetTvseries } from "../redux/features/tvseries/tvseries-slice";
import { apiSlice } from "../redux/api/api-slice";
import { useLogoutUserMutation } from "../redux/api/users-api-slice";

// pkgs
import toast from "react-hot-toast";

/**
 * useResetApiAndUser custom hook.
 *
 * It returns a function that clears local storage, clears cookies, resets app redux store and clears rtk cache.
 *
 * @returns {function} The function to reset the app state.
 */
const useResetApiAndUser = () => {
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const resetAll = async () => {
    dispatch(clearCredentials());
    dispatch(resetTvseries());
    dispatch(apiSlice.util.resetApiState());

    try {
      const res = await logoutUser().unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return resetAll;
};

export { useResetApiAndUser };
