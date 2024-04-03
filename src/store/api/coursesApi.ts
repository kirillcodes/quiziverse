import { createApi } from "@reduxjs/toolkit/query/react";
import { interceptorQuery } from "./interceptorQuery";

type createCourseTypes = {
  title: string;
  description: string;
};

type Course = {
  id: number;
  title: string;
  author: string;
};

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  tagTypes: ["SignedCourses", "AllCourses"],
  baseQuery: interceptorQuery,
  endpoints: (builder) => ({
    getCourseById: builder.query({
      query: (id: string) => `courses/${id}`,
    }),
    getSignedCourses: builder.query({
      query: () => "courses/signed",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "SignedCourses", id })),
              { type: "SignedCourses", id: "LIST" },
            ]
          : [{ type: "SignedCourses", id: "LIST" }],
    }),
    searchCourses: builder.mutation<Course[], string>({
      query: (query: string) => ({ url: `courses/search?query=${query}`, method: "GET" }),
    }),
    createCourse: builder.mutation({
      query: (body: createCourseTypes) => ({ url: "courses/create", method: "POST", body }),
      invalidatesTags: [
        { type: "SignedCourses", id: "LIST" },
        { type: "AllCourses", id: "LIST" },
      ],
    }),
    deleteCourse: builder.mutation({
      query: (id: string | undefined) => ({ url: `courses/${id}/delete`, method: "DELETE" }),
      invalidatesTags: [
        { type: "SignedCourses", id: "LIST" },
        { type: "AllCourses", id: "LIST" },
      ],
    }),
    subscribeToCourse: builder.mutation({
      query: (id: string | undefined) => ({ url: `courses/${id}/subscribe`, method: "POST" }),
      invalidatesTags: [
        { type: "SignedCourses", id: "LIST" },
        { type: "AllCourses", id: "LIST" },
      ],
    }),
    unsubscribeFromCourse: builder.mutation({
      query: (id: string | undefined) => ({ url: `courses/${id}/unsubscribe`, method: "DELETE" }),
      invalidatesTags: [
        { type: "SignedCourses", id: "LIST" },
        { type: "AllCourses", id: "LIST" },
      ],
    }),
    setCoverToCourse: builder.mutation({
      query: ({ id, imageData }: { id: number | undefined; imageData: FormData }) => ({
        url: `courses/${id}/upload-cover`,
        method: "PUT",
        body: imageData,
      }),
    }),
  }),
});

export const {
  useGetCourseByIdQuery,
  useGetSignedCoursesQuery,
  useSearchCoursesMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useSubscribeToCourseMutation,
  useUnsubscribeFromCourseMutation,
  useSetCoverToCourseMutation,
} = coursesApi;
