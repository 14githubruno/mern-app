// react lib
import { useEffect } from "react";

// redux lib
import { useSelector } from "react-redux";

// react-router-dom lib
import { Navigate, Outlet } from "react-router-dom";

// lib
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";

// pkgs
import toast from "react-hot-toast";

/**
 * PrivateRoute component.
 *
 * It restricts access to specific routes based on user authentication, acting as a "middleware" component
 *
 * @returns {JSX.Element} The rendered component/page authorized user wants to access.
 */
export default function PrivateRoute() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const refresh = useSelector((state) => state.auth.refresh);
  const thereIsUser = user && token && refresh;

  const resetAll = useResetApiAndUser();

  useEffect(() => {
    if (!thereIsUser) {
      toast.error("Log in first or kreate an akkount");
      resetAll();
    }
  }, []);

  return thereIsUser ? <Outlet /> : <Navigate to={"/login"} replace />;
}
