import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DEV_BASE_URL, PROD_BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === "development" ? DEV_BASE_URL : PROD_BASE_URL,
  credentials: "include",
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Tvseries"],
  // extractRehydrationInfo(action, state) {
  //   if (action.type === "persist/REHYDRATE") {
  //     if (action.key === "root") {
  //       return action.payload;
  //     }
  //     return action.payload[state.reducerPath];
  //   }
  // },
  endpoints: (builder) => ({}),
});

export { apiSlice };
