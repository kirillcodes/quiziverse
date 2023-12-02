import { createBrowserRouter } from "react-router-dom";
import { Root } from "@pages";
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
]);
