import { createBrowserRouter } from "react-router-dom";
import { Auth, CoursePage, NotFound, Root } from "@pages";
import { Courses } from "@pages";

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
        path: 'course/:id',
        element: <CoursePage />
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
