import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DEV_BASE_URL, PROD_BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === "development" ? DEV_BASE_URL : PROD_BASE_URL,
  credentials: "include",
  // prepareHeaders: (headers, { getState }) => {
  //   const { token } = getState().auth;
  //   if (token) {
  //     headers.set("authorization", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Tvseries"],
  extractRehydrationInfo(action, state) {
    if (action.type === "persist/REHYDRATE") {
      if (action?.payload?.api) {
        const { api } = action.payload;
        return api;
      } else {
        return {};
      }
    }
    return undefined;
  },
  endpoints: (builder) => ({}),
});

export { apiSlice };
