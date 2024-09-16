import { apiSlice } from "./api-slice";
import { API_USERS } from "../constants";

/**
 * Injects user-related endpoints in the root api slice.
 *
 * For each endpoint generates hooks to be exported and used across the application.
 * @example
 * export const userApiSlice = apiSlice.injectEndpoints({
 *    endpoints: (builder) => ({
 *    // create register user endpoint
 *      registerUser: builder.mutation({
 *        query: (credentials) => ({
 *        url: `${API_USERS}/register`,
 *        method: "POST",
 *        body: credentials,
 *      }),
 *      // other props...
 *    }),
 *    // other endpoints...
 *   })
 * })
 *
 * // Export rtk hook base on endpoint from slice
 * export const { useRegisterUserMutation } = userApiSlice;
 *
 * @see {@link https://redux-toolkit.js.org/tutorials/rtk-query} for more info.
 */
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * POST /api/users/register
     *
     * Endpoint to register user.
     */
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: `${API_USERS}/register`,
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * GET /api/users/verify/:token
     *
     * Endpoint to verify token in params.
     */
    verifyToken: builder.query({
      query: (token) => ({
        url: `${API_USERS}/verify/${token}`,
      }),
    }),

    /**
     * PATCH /api/users/verify/:token
     *
     * Endpoint to verify user and confirm user registration.
     */
    verifyUser: builder.mutation({
      query: (symbol) => ({
        url: `${API_USERS}/verify/${symbol.token}`,
        method: "PATCH",
        body: symbol,
      }),
    }),

    /**
     * POST /api/users/login
     *
     * Endpoint to log in user.
     */
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `${API_USERS}/login`,
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * POST /api/users/forgot-password
     *
     * Endpoint to start password reset.
     */
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `${API_USERS}/forgot-password`,
        method: "POST",
        body: email,
      }),
    }),

    /**
     * PATCH /api/users/verify-password-secret/:token
     *
     * Endpoint to verify password secret and re-verify user.
     */
    verifyPasswordSecret: builder.mutation({
      query: (symbol) => ({
        url: `${API_USERS}/verify-password-secret/${symbol.token}`,
        method: "PATCH",
        body: symbol,
      }),
    }),

    /**
     * PATCH /api/users/reset-password/:token
     *
     * Endpoint to complete password reset.
     */
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${API_USERS}/reset-password/${data.token}`,
        method: "PATCH",
        body: data,
      }),
    }),

    /**
     * POST /api/users/logout
     *
     * Endpoint to log out user.
     */
    logoutUser: builder.mutation({
      query: () => ({
        url: `${API_USERS}/logout`,
        method: "POST",
      }),
    }),

    /**
     * GET /api/users/profile
     *
     * Endpoint to get user data for profile page.
     */
    getUserProfile: builder.query({
      query: () => ({
        url: `${API_USERS}/profile`,
      }),
      providesTags: ["User"],
    }),

    /**
     * PATCH /api/users/profile/:id
     *
     * Endpoint to update user profile.
     */
    updateUserProfile: builder.mutation({
      query: (userToUpdate) => ({
        url: `${API_USERS}/profile/${userToUpdate._id}`,
        method: "PATCH",
        body: userToUpdate,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * PATCH /api/users/profile/verify/:token
     *
     * Endpoint to confirm that user wants to update data and confirm updates.
     */
    verifyUpdateUserProfile: builder.mutation({
      query: (symbol) => ({
        url: `${API_USERS}/profile/verify/${symbol.token}`,
        method: "PATCH",
        body: symbol,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * DELETE /api/users/profile/:id
     *
     * Endpoint to delete user account.
     */
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
  useVerifyTokenQuery,
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
