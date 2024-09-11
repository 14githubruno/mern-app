import { apiSlice } from "./api-slice";
import { API_TVSERIES } from "../constants";

export const tvseriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

    getOneTvseries: builder.query({
      query: (params) => ({
        url: `${API_TVSERIES}/${params.id}/${params.title}`,
      }),
      providesTags: ["Tvseries"],
    }),

    createOneTvseries: builder.mutation({
      query: (tvseriesToCreate) => ({
        url: `${API_TVSERIES}`,
        method: "POST",
        body: tvseriesToCreate,
      }),
      invalidatesTags: ["Tvseries"],
    }),

    updateOneTvseries: builder.mutation({
      query: (tvseriesToUpdate) => ({
        url: `${API_TVSERIES}/${tvseriesToUpdate._id}`,
        method: "PATCH",
        body: tvseriesToUpdate,
      }),
      invalidatesTags: ["Tvseries"],
    }),

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
