import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "@layouts";
import scss from "@styles/pages/Root.module.scss";
import { Container } from "@components";
import { useAppSelector } from "@hooks/useAppSelector";
import { useEffect } from "react";

export const Root = () => {
  const token: boolean = useAppSelector((state) => !!state.auth.loginData.accessToken);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  return token ? (
    <main className={scss.main}>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </main>
  ) : null;
};
