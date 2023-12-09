import React, { useState } from "react";
import { CustomInput } from "@components";
import Logo from "@assets/images/logo-universe.png";

import scss from "@styles/pages/Auth.module.scss";
import { CustomButton } from "@components/CustomButton";

export const Auth: React.FC = () => {
  const emailDomain: string = import.meta.env.VITE_STUDENT_EMAIL_DOMAIN;

  const [authMethod, setAuthMethod] = useState("login");

  const handleChoiceMethod = (method: string) => {
    setAuthMethod(method);
  };

  return (
    <div className={scss.auth}>
      <div className={scss.container}>
        <img src={Logo} alt="Quiziverse" />
        <h1>Authorization</h1>
        <div className={scss.choiceMethod}>
          <div
            onClick={() => handleChoiceMethod("login")}
            style={authMethod === "login" ? { backgroundColor: "var(--light-color)" } : {}}
          >
            Login
          </div>
          <div
            onClick={() => handleChoiceMethod("registration")}
            style={authMethod === "registration" ? { backgroundColor: "var(--light-color)" } : {}}
          >
            Registration
          </div>
        </div>
        <form>
          <h3>Email:</h3>
          <CustomInput
            type="email"
            placeholder={`kirillcodes@${emailDomain ? emailDomain : "quiziverse.com"}`}
          />
          <h3>Password:</h3>
          <CustomInput type="password" placeholder="••••••••••" />
          <CustomButton title={authMethod === "login" ? "Sign-In" : "Sign-Up"} />
        </form>
      </div>
    </div>
  );
};
