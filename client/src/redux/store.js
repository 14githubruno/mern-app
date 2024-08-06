import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/auth-slice";
import tvseriesReducer from "./features/tvseries/tvseries-slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    tvseries: tvseriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export { store };
