import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/features/auth/auth-slice";
import { resetTvseries } from "../redux/features/tvseries/tvseries-slice";
import { apiSlice } from "../redux/api/api-slice";

const useResetApiAndUser = () => {
  const dispatch = useDispatch();

  const resetAll = () => {
    dispatch(clearCredentials());
    dispatch(resetTvseries());
    dispatch(apiSlice.util.resetApiState());
  };

  return resetAll;
};

export { useResetApiAndUser };
