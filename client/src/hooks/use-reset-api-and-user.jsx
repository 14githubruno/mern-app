import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/features/auth/auth-slice";
import { resetTvseries } from "../redux/features/tvseries/tvseries-slice";
import { apiSlice } from "../redux/api/api-slice";

/**
 * useResetApiAndUser custom hook.
 *
 * It returns a function that clears local storage, resets app redux store and APIs.
 *
 * @returns {function} The function to reset the app state.
 */
const useResetApiAndUser = () => {
  const dispatch = useDispatch();

  const resetAll = () => {
    dispatch(clearCredentials());
    dispatch(resetTvseries());
    dispatch(apiSlice.util.resetApiState());
    localStorage.clear();
  };

  return resetAll;
};

export { useResetApiAndUser };
