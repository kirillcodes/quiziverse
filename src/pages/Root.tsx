import { Outlet } from "react-router-dom";
import { Navbar } from "@layouts/Navbar";
import scss from "@styles/pages/Root.module.scss";

export const Root = () => {
  return (
    <main className={scss.main}>
      <Navbar />
      <Outlet />
    </main>
  );
};
