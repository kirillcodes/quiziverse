import { createBrowserRouter } from "react-router-dom";
import { Auth, CoursePage, Courses, TestPage, NotFound, Root } from "@pages";

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
        path: "course/:id/test/:id",
        element: <TestPage />,
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
