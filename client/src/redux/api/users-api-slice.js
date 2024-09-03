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

    verifyUser: builder.query({
      query: (token) => ({
        url: `${API_USERS}/verify/${token}`,
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
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation({
      query: (userToUpdate) => ({
        url: `${API_USERS}/${userToUpdate._id}`,
        method: "PATCH",
        body: userToUpdate,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUserProfile: builder.mutation({
      query: (userToDelete) => ({
        url: `${API_USERS}/${userToDelete._id}`,
        method: "DELETE",
        body: userToDelete,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
} = userApiSlice;
