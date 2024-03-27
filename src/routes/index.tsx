import { createBrowserRouter } from "react-router-dom";
import { Auth, CoursePage, Courses, ResultsPage, TestPage, NotFound, Root } from "@pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Courses />,
      },
      {
        path: "course/:id",
        element: <CoursePage />,
      },
      {
        path: "course/:courseId/test/:testId",
        element: <TestPage />,
      },
      {
        path: "course/:courseId/test/:testId/results",
        element: <ResultsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "auth",
    element: <Auth />,
  },
]);
