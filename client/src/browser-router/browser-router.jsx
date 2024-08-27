import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateRoute from "../components/private-route";
import ErrorPage from "../pages/error-page";
import Homepage from "../pages/homepage";
import Register from "../pages/register";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import UserProfile from "../pages/user-profile";
import UpdateUserProfile from "../pages/update-user-profile";
import CreateTvseries from "../pages/create-tvseries";
import UpdateTvseries from "../pages/update-tvseries";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/kreate-tvseries",
            element: <CreateTvseries />,
          },
          {
            path: "/dashboard/update-tvseries/:id",
            element: <UpdateTvseries />,
          },
          {
            path: "/profile",
            element: <UserProfile />,
          },
          {
            path: "/profile/update-user",
            element: <UpdateUserProfile />,
          },
        ],
      },
    ],
  },
]);

export { browserRouter };
