import { createApi } from "@reduxjs/toolkit/query/react";
import { interceptorQuery } from "./interceptorQuery";
import { CreateTestDto } from "@dto/create-test.dto";

type Answer = {
  id: number;
  text: string;
};

type Quesiton = {
  id: number;
  text: string;
  answers: Answer[];
};

type Test = {
  id: number;
  title: string;
  timeLimit: number;
  questions: Quesiton[];
  status?: number;
};

export const testsApi = createApi({
  reducerPath: "testsApi",
  tagTypes: ["TestsList"],
  baseQuery: interceptorQuery,
  endpoints: (builder) => ({
    createTest: builder.mutation<CreateTestDto, { courseId: string | number }>({
      query: ({ courseId, ...body }) => ({
        url: `courses/${courseId}/tests`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "TestsList", id: "LIST" }],
    }),
    getTests: builder.query({
      query: (courseId: string | number) => `courses/${courseId}/tests`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "TestsList" as const, id })),
              { type: "TestsList", id: "LIST" },
            ]
          : [{ type: "TestsList", id: "LIST" }],
    }),
    getTest: builder.query<Test, { courseId: string | undefined; testId: string | undefined }>({
      query: ({ courseId, testId }) => `courses/${courseId}/tests/${testId}`,
    }),
  }),
});

export const { useCreateTestMutation, useGetTestsQuery, useGetTestQuery } = testsApi;
