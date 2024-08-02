import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = useSelector((state) => state.auth.user);

  let checkIfThereIsUser =
    user !== null ? <Outlet /> : <Navigate to="/" replace />;

  return checkIfThereIsUser;
}
