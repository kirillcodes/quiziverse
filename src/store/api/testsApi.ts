import { createApi } from "@reduxjs/toolkit/query/react";
import { interceptorQuery } from "./interceptorQuery";
import { CreateTestDto } from "@dto/create-test.dto";

export const testsApi = createApi({
  reducerPath: "testsApi",
  tagTypes: ["TestsList"],
  baseQuery: interceptorQuery,
  endpoints: (builder) => ({
    createTest: builder.mutation<CreateTestDto, { courseId: string }>({
      query: ({ courseId, ...body }) => ({
        url: `courses/${courseId}/tests`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "TestsList", id: "LIST" }],
    }),
    getTests: builder.query({
      query: (courseId: string) => `courses/${courseId}/tests`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "TestsList" as const, id })),
              { type: "TestsList", id: "LIST" },
            ]
          : [{ type: "TestsList", id: "LIST" }],
    }),
    getTest: builder.query({
      query: ({ courseId, testId }: { courseId: string; testId: string }) =>
        `cousres/${courseId}/tests/${testId}`,
    }),
  }),
});

export const { useCreateTestMutation, useGetTestsQuery, useGetTestQuery } = testsApi;
