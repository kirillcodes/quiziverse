import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes";
import { store } from "@store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")! as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
