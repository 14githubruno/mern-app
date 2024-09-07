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

    verifyUser: builder.mutation({
      query: (symbol) => ({
        url: `${API_USERS}/verify/${symbol.token}`,
        method: "PATCH",
        body: symbol,
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `${API_USERS}/login`,
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${API_USERS}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),

    verifyPasswordSecret: builder.mutation({
      query: (data) => ({
        url: `${API_USERS}/verify-password-secret/${data.token}`,
        method: "PATCH",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${API_USERS}/reset-password/${data.token}`,
        method: "PATCH",
        body: data,
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
        url: `${API_USERS}/profile/${userToUpdate._id}`,
        method: "PATCH",
        body: userToUpdate,
      }),
      invalidatesTags: ["User"],
    }),

    verifyUpdateUserProfile: builder.mutation({
      query: (symbol) => ({
        url: `${API_USERS}/profile/verify/${symbol.token}`,
        method: "PATCH",
        body: symbol,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUserProfile: builder.mutation({
      query: (userToDelete) => ({
        url: `${API_USERS}/profile/${userToDelete._id}`,
        method: "DELETE",
        body: userToDelete,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useVerifyPasswordSecretMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useVerifyUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
} = userApiSlice;
