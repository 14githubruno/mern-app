import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/@forward/main.scss";

// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

// browser router
import { browserRouter } from "./browser-router/browser-router";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={browserRouter} />
  </Provider>
);
