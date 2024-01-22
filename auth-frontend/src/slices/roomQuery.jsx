import { baseApi } from "./baseApiPath";

export const roomSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllrooms: build.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
    }),
    createNewRoom : build.mutation({
      query: (data) => ({
        url : "/rooms",
        method: "POST",
        body: data,
      })
    })
  }),
});

export const { useGetAllroomsQuery,useCreateNewRoomMutation } = roomSlice;
