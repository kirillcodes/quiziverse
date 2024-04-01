import { createApi } from "@reduxjs/toolkit/query/react";
import { interceptorQuery } from "./interceptorQuery";

type createCourseTypes = {
  title: string;
  description: string;
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
    getAllCourses: builder.query({
      query: () => "courses/all",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "AllCourses", id })),
              { type: "AllCourses", id: "LIST" },
            ]
          : [{ type: "AllCourses", id: "LIST" }],
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
  }),
});

export const {
  useGetCourseByIdQuery,
  useGetSignedCoursesQuery,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useSubscribeToCourseMutation,
  useUnsubscribeFromCourseMutation,
} = coursesApi;
