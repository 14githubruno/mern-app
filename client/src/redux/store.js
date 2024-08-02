import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/auth-slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export { store };
