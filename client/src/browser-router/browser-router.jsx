import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateRoute from "../components/private-route";
import Homepage from "../pages/homepage";
import Register from "../pages/register";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";

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
        ],
      },
    ],
  },
]);

export { browserRouter };
