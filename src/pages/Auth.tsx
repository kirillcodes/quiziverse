import React, { useEffect, useState } from "react";
import { CustomInput } from "@components";
import { CustomButton } from "@components/CustomButton";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { loginUser, registerUser } from "@store/auth/actionCreators";

import Logo from "@assets/images/logo-universe.png";
import scss from "@styles/pages/Auth.module.scss";
import { useAppSelector } from "@hooks/useAppSelector";

export const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const registered = useAppSelector((state) => state.auth.registerData.registered);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState("login");

  const emailDomain: string = import.meta.env.VITE_STUDENT_EMAIL_DOMAIN;

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAuthMethod = (method: string) => {
    setAuthMethod(method);
  };

  const handleAuthSubmit = () => {
    if (authMethod === "login") {
      dispatch(loginUser({ email, password }));
    } else if (authMethod === "register") {
      dispatch(registerUser({ email, password }));
      if (registered) setAuthMethod("login");
    }
  };

  useEffect(() => {
    if (registered) setAuthMethod("login");
  }, [registered]);

  return (
    <div className={scss.auth}>
      <div className={scss.container}>
        <img src={Logo} alt="Quiziverse" />
        <h1>Authorization</h1>
        <div className={scss.choiceMethod}>
          <div
            onClick={() => handleAuthMethod("login")}
            style={authMethod === "login" ? { backgroundColor: "var(--light-color)" } : {}}
          >
            Login
          </div>
          <div
            onClick={() => handleAuthMethod("register")}
            style={authMethod === "register" ? { backgroundColor: "var(--light-color)" } : {}}
          >
            Registration
          </div>
        </div>
        <form>
          <h3>Email:</h3>
          <CustomInput
            type="email"
            placeholder={`kirillcodes@${emailDomain ? emailDomain : "quiziverse.com"}`}
            value={email}
            handleInput={handleEmailInput}
          />
          <h3>Password:</h3>
          <CustomInput
            type="password"
            placeholder="••••••••••"
            value={password}
            handleInput={handlePasswordInput}
          />
          <CustomButton
            title={authMethod === "login" ? "Sign-In" : "Sign-Up"}
            handleSubmit={handleAuthSubmit}
          />
        </form>
      </div>
    </div>
  );
};
