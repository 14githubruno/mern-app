import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

export default function PrivateRoute() {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      toast.error("Log in first or kreate an akkount");
    }
  }, []);

  let check_if_user_is_logged_in =
    user !== null ? <Outlet /> : <Navigate to="/" replace />;

  return check_if_user_is_logged_in;
}
