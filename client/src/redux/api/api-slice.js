import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DEV_BASE_URL, PROD_BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === "development" ? DEV_BASE_URL : PROD_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Tvseries"],
  endpoints: (builder) => ({}),
});
