import { apiSlice } from "./api-slice";
import { API_TVSERIES } from "../constants";

/**
 * Injects tvseries-related endpoints in the root api slice.
 *
 * For each endpoint generates hooks to be exported and used across the application.
 * @example
 * export const tvseriesApiSlice = apiSlice.injectEndpoints({
 *    endpoints: (builder) => ({
 *    // create get all tvseries endpoint
 *      getAllTvseries: builder.query({
 *        query: () => ({
 *        url: `${API_TVSERIES}`,
 *      }),
 *      // other props...
 *    }),
 *    // other endpoints...
 *   })
 * })
 *
 * // Export rtk hook base on endpoint from slice
 * export const { useGetAllTvseriesQuery } = tvseriesApiSlice;
 *
 * @see {@link https://redux-toolkit.js.org/tutorials/rtk-query} for more info.
 */
export const tvseriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * GET /api/tvseries
     *
     * Endpoint to get all tvseries
     */
    getAllTvseries: builder.query({
      query: () => ({
        url: `${API_TVSERIES}`,
      }),
      transformResponse: (res) => {
        const sortedItems = res.body
          .slice()
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        return { ...res, body: sortedItems };
      },
      providesTags: ["Tvseries"],
    }),

    /**
     * GET /api/tvseries/:id/:title
     *
     * Endpoint to get one tvseries
     */
    getOneTvseries: builder.query({
      query: (params) => ({
        url: `${API_TVSERIES}/${params.id}/${params.title}`,
      }),
      providesTags: ["Tvseries"],
    }),

    /**
     * POST /api/tvseries
     *
     * Endpoint to create one tvseries
     */
    createOneTvseries: builder.mutation({
      query: (tvseriesToCreate) => ({
        url: `${API_TVSERIES}`,
        method: "POST",
        body: tvseriesToCreate,
      }),
      invalidatesTags: ["Tvseries"],
    }),

    /**
     * PATCH /api/tvseries/:id
     *
     * Endpoint to update one tvseries
     */
    updateOneTvseries: builder.mutation({
      query: (tvseriesToUpdate) => ({
        url: `${API_TVSERIES}/${tvseriesToUpdate._id}`,
        method: "PATCH",
        body: tvseriesToUpdate,
      }),
      invalidatesTags: ["Tvseries"],
    }),

    /**
     * DELETE /api/tvseries/:id
     *
     * Endpoint to delete one tvseries
     */
    deleteOneTvseries: builder.mutation({
      query: (tvseriesToDelete) => ({
        url: `${API_TVSERIES}/${tvseriesToDelete._id}`,
        method: "DELETE",
        body: tvseriesToDelete,
      }),
      invalidatesTags: ["Tvseries"],
    }),
  }),
});

export const {
  useGetAllTvseriesQuery,
  useGetOneTvseriesQuery,
  useCreateOneTvseriesMutation,
  useUpdateOneTvseriesMutation,
  useDeleteOneTvseriesMutation,
} = tvseriesApiSlice;
