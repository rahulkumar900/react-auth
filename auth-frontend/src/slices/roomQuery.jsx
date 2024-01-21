import { baseApi } from "./baseApiPath";

export const roomSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllrooms: build.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllroomsQuery } = roomSlice;
