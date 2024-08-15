import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/@forward/main.scss";

// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// browser router
import { browserRouter } from "./browser-router/browser-router";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <RouterProvider router={browserRouter} />
    </PersistGate>
  </Provider>
);
