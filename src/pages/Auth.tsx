import React from "react";
import { CustomInput } from "@components";
import Logo from "@assets/images/logo-universe.png";

import scss from "@styles/pages/Auth.module.scss";
import { CustomButton } from "@components/CustomButton";

export const Auth: React.FC = () => {
  const emailDomain: string = import.meta.env.VITE_STUDENT_EMAIL_DOMAIN;

  return (
    <div className={scss.auth}>
      <div className={scss.container}>
        <img src={Logo} alt="Quiziverse" />
        <h2>Authorization</h2>
        <div className={scss.choiceMethod}>
          <div>Login</div>
          <span></span>
          <div>Registration</div>
        </div>
        <form>
          <CustomInput
            type="email"
            placeholder={`kirillcodes@${emailDomain ? emailDomain : "quiziverse.com"}`}
          />
          <CustomInput type="password" placeholder="Password" />
          <CustomButton title="Registration" />
        </form>
      </div>
    </div>
  );
};
