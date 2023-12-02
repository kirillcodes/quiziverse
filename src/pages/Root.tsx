import { Outlet } from "react-router-dom";
import { Navbar } from "@layouts";
import scss from "@styles/pages/Root.module.scss";
import { Container } from "@components";

export const Root = () => {
  return (
    <main className={scss.main}>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </main>
  );
};
