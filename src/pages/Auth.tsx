import React, { useEffect, useState } from "react";
import { CustomInput, MessageError, CustomButton } from "@components";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { loginUser, registerUser } from "@store/auth/actionCreators";
import { useAppSelector } from "@hooks/useAppSelector";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Logo from "@assets/images/logo-universe.png";
import scss from "@styles/pages/Auth.module.scss";

export const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const registered: boolean = useAppSelector((state) => state.auth.registerData.registered);
  const token: boolean = useAppSelector((state) => !!state.auth.loginData.accessToken);
  const navigate: NavigateFunction = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authMethod, setAuthMethod] = useState("login");

  const studentEmailDomain: string = import.meta.env.VITE_STUDENT_EMAIL_DOMAIN;
  const teacherEmailDomain: string = import.meta.env.VITE_TEACHER_EMAIL_DOMAIN;

  const emailRegex = new RegExp(
    `^[^\\s@]+@(?:${studentEmailDomain.replace(".", "\\.")}|${teacherEmailDomain.replace(
      ".",
      "\\."
    )})$`
  );

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (e.target.value.length === 0) {
      setEmailError("Email address cannot be empty");
    } else if (!emailRegex.test(e.target.value)) {
      setEmailError("Incorrect email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.length <= 5) {
      setPasswordError("Password must be at least 6 characters");
    } else if (e.target.value.includes(" ")) {
      setPasswordError("Password must not contain spaces");
    } else {
      setPasswordError("");
    }
  };

  const handleAuthMethod = (method: string) => {
    setAuthMethod(method);
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const handleAuthSubmit = () => {
    setEmail((prev) => prev.toLowerCase());

    if (authMethod === "login") {
      dispatch(loginUser({ email, password }));
    } else if (authMethod === "register") {
      dispatch(registerUser({ email, password }));
    }
  };

  useEffect(() => {
    if (registered) setAuthMethod("login");
    if (token) navigate("/");
  }, [registered, token, navigate]);

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
          {!!emailError && <MessageError title={emailError} />}
          <h3>Email:</h3>
          <CustomInput
            type="email"
            placeholder={`kirillcodes@${
              teacherEmailDomain ? teacherEmailDomain : "quiziverse.com"
            }`}
            value={email}
            handleInput={handleEmailInput}
          />

          {!!passwordError && <MessageError title={passwordError} />}
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
            disabled={!!passwordError || !!emailError || !email || !password}
          />
        </form>
      </div>
    </div>
  );
};
