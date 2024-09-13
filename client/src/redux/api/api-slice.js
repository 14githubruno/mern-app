import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
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
