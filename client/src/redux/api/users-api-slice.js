import { apiSlice } from "./api-slice";
import { API_USERS } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: `${API_USERS}/register`,
        method: "POST",
        body: credentials,
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `${API_USERS}/login`,
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: `${API_USERS}/logout`,
        method: "POST",
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: `${API_USERS}/profile`,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
} = userApiSlice;
