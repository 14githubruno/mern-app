import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/@forward/main.scss";

// browser router
import { browserRouter } from "./browser-router/browser-router";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={browserRouter} />
);
