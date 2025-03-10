// components
import App from "../App";
import PrivateRoute from "../components/private-route";
import ErrorPage from "../pages/error-page";
import Homepage from "../pages/homepage";
import PrivacyNotice from "../pages/privacy-notice";
import Register from "../pages/register";
import VerifyUser from "../pages/verify-user";
import Login from "../pages/login";
import ForgotPassword from "../pages/forgot-password";
import VerifyPasswordSecret from "../pages/verify-password-secret";
import ResetPassword from "../pages/reset-password";
import Dashboard from "../pages/dashboard";
import UserProfile from "../pages/user-profile";
import UpdateUserProfile from "../pages/update-user-profile";
import VerifyUpdateUserProfile from "../pages/verify-update-user-profile";
import CreateTvseries from "../pages/create-tvseries";
import UpdateTvseries from "../pages/update-tvseries";

// react-router-dom lib
import { createBrowserRouter } from "react-router-dom";

/**
 * @constant
 * browserRouter configuration object.
 *
 * It defines the routes of the web app.
 *
 * @returns {Object} The browserRouter configuration object.
 */
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/privacy-notice",
        element: <PrivacyNotice />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify/:token",
        element: <VerifyUser />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-password-sekret/:token",
        element: <VerifyPasswordSecret />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
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
          {
            path: "/profile/update-user/verify/:token",
            element: <VerifyUpdateUserProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export { browserRouter };
