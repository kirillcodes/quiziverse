import { createApi } from "@reduxjs/toolkit/query/react";
import { interceptorQuery } from "./interceptorQuery";

type authTypes = {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: interceptorQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: authTypes) => ({ url: `auth/sign-in`, method: "POST", body }),
    }),
    registration: builder.mutation({
      query: (body: authTypes) => ({ url: "auth/sign-up", method: "POST", body }),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation } = authApi;
