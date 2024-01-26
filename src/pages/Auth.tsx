import React, { useEffect, useState } from "react";
import { CustomInput, MessageError, CustomButton } from "@components";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Logo from "@assets/images/logo-universe.png";
import scss from "@styles/pages/Auth.module.scss";
import { useLoginMutation, useRegistrationMutation } from "@store/api/authApi";
import { useGetSignedCoursesQuery } from "@store/api/coursesApi";

export const Auth: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectEmail, setIncorrectEmail] = useState("");
  const [incorrectPassword, setIncorrestPassword] = useState("");
  const [authMethod, setAuthMethod] = useState("login");

  const studentEmailDomain: string = import.meta.env.VITE_STUDENT_EMAIL_DOMAIN;
  const teacherEmailDomain: string = import.meta.env.VITE_TEACHER_EMAIL_DOMAIN;

  const [loginMutation, { data: loginData, isSuccess: isLoggedIn }] = useLoginMutation();
  const [registrationMutation, { isSuccess: isRegistered }] = useRegistrationMutation();
  const { refetch: refetchSignedCourses } = useGetSignedCoursesQuery({});

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setIncorrectEmail("");
    setIncorrestPassword("");
  };

  const emailRegex = new RegExp(
    `^[^\\s@]+@(?:${studentEmailDomain.replace(".", "\\.")}|${teacherEmailDomain.replace(
      ".",
      "\\."
    )})$`
  );

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (e.target.value.length === 0) {
      setIncorrectEmail("Email address cannot be empty");
    } else if (!emailRegex.test(e.target.value)) {
      setIncorrectEmail("Incorrect email address");
    } else {
      setIncorrectEmail("");
    }
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.length <= 5) {
      setIncorrestPassword("Password must be at least 6 characters");
    } else if (e.target.value.includes(" ")) {
      setIncorrestPassword("Password must not contain spaces");
    } else {
      setIncorrestPassword("");
    }
  };

  const handleAuthMethod = (method: string) => {
    setAuthMethod(method);
    clearInputs();
  };

  const handleAuthSubmit = async () => {
    setEmail((prev) => prev.toLowerCase());

    try {
      if (authMethod === "login") {
        await loginMutation({ email, password }).unwrap();
      } else if (authMethod === "registration") {
        await registrationMutation({ email, password }).unwrap();
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      handleAuthMethod("login");
    }
    if (isLoggedIn) {
      localStorage.setItem("token", loginData.token);
      navigate("/");
      refetchSignedCourses();
    }
  }, [isLoggedIn, isRegistered, navigate, loginData]);

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
            onClick={() => handleAuthMethod("registration")}
            style={authMethod === "registration" ? { backgroundColor: "var(--light-color)" } : {}}
          >
            Registration
          </div>
        </div>
        <form>
          {!!incorrectEmail && <MessageError title={incorrectEmail} />}
          <h3>Email:</h3>
          <CustomInput
            type="email"
            placeholder={`kirillcodes@${
              teacherEmailDomain ? teacherEmailDomain : "quiziverse.com"
            }`}
            value={email}
            handleInput={handleEmailInput}
          />

          {!!incorrectPassword && <MessageError title={incorrectPassword} />}
          <h3>Password:</h3>
          <CustomInput
            type="password"
            placeholder="••••••••••"
            value={password}
            handleInput={handlePasswordInput}
          />

          <CustomButton
            title={authMethod === "login" ? "Login" : "Registration"}
            handleSubmit={handleAuthSubmit}
            disabled={!!incorrectPassword || !!incorrectEmail || !email || !password}
          />
        </form>
      </div>
    </div>
  );
};
