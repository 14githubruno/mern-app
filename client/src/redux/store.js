import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/api-slice";
import authReducer from "./features/auth/auth-slice";
import tvseriesReducer from "./features/tvseries/tvseries-slice";

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  tvseries: tvseriesReducer,
});

const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export { store };
