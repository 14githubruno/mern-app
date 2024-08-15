import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import toast from "react-hot-toast";

export default function PrivateRoute() {
  console.log("private route hit");
  const location = useLocation();
  const resetAll = useResetApiAndUser();
  const user = useSelector((state) => state.auth.user);
  const tokenExpirationDate = useSelector(
    (state) => state.auth.tokenExpirationDate
  );

  useEffect(() => {
    if (user === null) {
      console.log("no user");
      toast.error("Log in first or kreate an akkount");
    }
  }, [location]);

  useEffect(() => {
    if (user && tokenExpirationDate && tokenExpirationDate < Date.now()) {
      console.log("invalid token");
      toast.error("Token has expired. Log in again");
      resetAll();
    }
  }, [location]);

  let content;
  if (user && tokenExpirationDate && tokenExpirationDate < Date.now()) {
    content = <Navigate to={"/login"} replace />;
  } else if (user === null) {
    content = <Navigate to={"/"} replace />;
  } else {
    content = <Outlet />;
  }

  return content;
}
