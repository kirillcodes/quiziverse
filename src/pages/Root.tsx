import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "@layouts";
import scss from "@styles/pages/Root.module.scss";
import { Container } from "@components";
import { useEffect } from "react";
import { loginUserByStorage } from "@store/auth/actionCreators";
import { useAppDispatch } from "@hooks/useAppDispatch";

export const Root = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const isUserDataAccess = dispatch(loginUserByStorage());

  useEffect(() => {
    if (!isUserDataAccess) {
      navigate("/auth");
    }
  }, [navigate, isUserDataAccess]);

  return (
    isUserDataAccess && (
      <main className={scss.main}>
        <Navbar />
        <Container>
          <Outlet />
        </Container>
      </main>
    )
  );
};
