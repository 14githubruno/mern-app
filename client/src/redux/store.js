import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth-slice";
import counterReducer from "./features/counter/counter-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
  },
});

export { store };
