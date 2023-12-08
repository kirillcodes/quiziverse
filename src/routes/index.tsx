import { createBrowserRouter } from "react-router-dom";
import { Auth, Root } from "@pages";
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
    ],
  },
  {
    path: "auth",
    element: <Auth />,
  },
]);
