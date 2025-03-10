// redux toolkit lib
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, clearCredentials } from "../features/auth/auth-slice";
import { resetTvseries } from "../features/tvseries/tvseries-slice";

// glob vars
import { BASE_URL, API_USERS } from "../constants";

/**
 * Base config of RTK Query API slice.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    const refresh = getState().auth.refresh;
    const localStorageToken = localStorage.getItem("token");
    const localStorageRefresh = localStorage.getItem("refresh");

    try {
      let tokenParsed = localStorageToken
        ? JSON.parse(localStorageToken)
        : null;
      let authToken = tokenParsed === token ? token : tokenParsed;

      let refreshParsed = localStorageRefresh
        ? JSON.parse(localStorageRefresh)
        : null;
      let authRefresh = refreshParsed === refresh ? refresh : refreshParsed;

      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("refresh-token", `${authRefresh}`);
      return headers;
    } catch (error) {
      console.error("Invalid data:", error.message);
    }
  },
});

/**
 * Base config of BaseQuery with Reauth
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let res = await baseQuery(args, api, extraOptions);

  if (res?.error) {
    const err = res.error;

    if (err.status === 403) {
      const refreshRes = await baseQuery(
        `${API_USERS}/refresh`,
        api,
        extraOptions
      );

      if (refreshRes?.data) {
        const data = refreshRes.data;
        api.dispatch(
          setCredentials({
            user: data.body.name,
            token: data.body.token,
            refresh: data.body.refresh,
          })
        );
        res = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearCredentials());
        api.dispatch(resetTvseries());
      }
    }
  }

  return res;
};

/**
 * RTK Query API slice for making API requests.
 *
 * Endpoints will be injected by respective api slices (i.e. usersApiSlice, tvseriesApiSlice)
 */
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Tvseries"],
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});

export { apiSlice };
