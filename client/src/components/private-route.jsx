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

  let checkIfThereIsUser =
    user !== null ? <Outlet /> : <Navigate to="/" replace />;

  return checkIfThereIsUser;
}
