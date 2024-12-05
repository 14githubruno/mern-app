// redux toolkit lib
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// glob vars
import { BASE_URL } from "../constants";

/**
 * Base config of RTK Query API slice.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

/**
 * RTK Query API slice for making API requests.
 *
 * Endpoints will be injected by respective api slices (i.e. usersApiSlice, tvseriesApiSlice)
 */
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Tvseries"],
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});

export { apiSlice };
