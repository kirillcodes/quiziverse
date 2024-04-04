import { createApi } from "@reduxjs/toolkit/query/react";
import { interceptorQuery } from "./interceptorQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: interceptorQuery,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "users/profile",
    }),
    changePassword: builder.mutation({
      query: (body) => ({ url: "users/change-password", method: "PUT", body }),
    }),
  }),
});

export const { useGetProfileQuery, useChangePasswordMutation } = usersApi;
