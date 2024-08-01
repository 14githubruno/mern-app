import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/homepage";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
]);

export { browserRouter };
