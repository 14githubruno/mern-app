import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth-slice";
import counterReducer from "./features/counter/counter-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./api/pokemon";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    auth: authReducer,
    counter: counterReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export { store };
