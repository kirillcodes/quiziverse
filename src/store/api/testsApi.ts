import { createApi } from "@reduxjs/toolkit/query/react";
import { interceptorQuery } from "./interceptorQuery";
import { CreateTestDto } from "@dto/create-test.dto";

export const testsApi = createApi({
  reducerPath: "testsApi",
  baseQuery: interceptorQuery,
  endpoints: (builder) => ({
    createTest: builder.mutation<CreateTestDto, { courseId: string }>({
      query: ({ courseId, ...body }) => ({
        url: `courses/${courseId}/tests`,
        method: "POST",
        body,
      }),
    }),
    getTests: builder.query({
      query: (courseId: string) => `courses/${courseId}/tests`,
    }),
  }),
});

export const { useCreateTestMutation, useGetTestsQuery } = testsApi;
