import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/api-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/auth-slice";
import tvseriesReducer from "./features/tvseries/tvseries-slice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  tvseries: tvseriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export { store };
