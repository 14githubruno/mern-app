// react lib
import { useEffect } from "react";

// redux lib
import { useSelector } from "react-redux";

// react-router-dom lib
import { Navigate, Outlet, useLocation } from "react-router-dom";

// lib
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";

// pkgs
import toast from "react-hot-toast";

/**
 * PrivateRoute component.
 *
 * It intercepts logged in user and it renders through Outlet component whatever resource the authorized user asks for.
 * If user is not authorized, the latter is redirected to login page.
 *
 * (It restricts access to specific routes based on user authentication, acting as a "middleware" component)
 *
 * @returns {JSX.Element} The rendered component/page authorized user wants to access.
 */
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
      toast.error("Log in first or kreate an akkount");
    }
  }, [location]);

  useEffect(() => {
    if (user && tokenExpirationDate && tokenExpirationDate < Date.now()) {
      toast.error("Token expired. Log in again");
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
