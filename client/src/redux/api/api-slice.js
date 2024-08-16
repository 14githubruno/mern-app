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
  extractRehydrationInfo(action, state) {
    console.log(action);
    console.log(state);
  },
  endpoints: (builder) => ({}),
});

export { apiSlice };
