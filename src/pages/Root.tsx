import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "@layouts";
import scss from "@styles/pages/Root.module.scss";
import { Container } from "@components";
import { useEffect } from "react";

export const Root = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [navigate, token]);

  return (
    token && (
      <main className={scss.main}>
        <Navbar />
        <Container>
          <Outlet />
        </Container>
      </main>
    )
  );
};
