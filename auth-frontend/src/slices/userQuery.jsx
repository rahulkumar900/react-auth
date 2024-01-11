import { authApi } from "./baseApiPath";

export const userSlice = authApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: build.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    google: build.mutation({
      query: (data) => ({
        url: "/google-auth",
        method: "POST",
        body: data,
      }),
    }),
    getAll: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGoogleMutation,
  useGetAllQuery,
} = userSlice;
