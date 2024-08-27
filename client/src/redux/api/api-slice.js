import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DEV_BASE_URL, PROD_BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.MODE === "production" ? PROD_BASE_URL : DEV_BASE_URL,
  credentials: "include",
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Tvseries"],
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});

export { apiSlice };
