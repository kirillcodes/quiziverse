import React from "react";
import scss from "@styles/pages/NotFound.module.scss";
import { CustomButton } from "@components";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleClickButton = () => {
    navigate("/");
  };

  return (
    <div className={scss.notFound}>
      <div>
        <h1>Sorry, this page not found :(</h1>
        <CustomButton title="Back to Home" handleSubmit={handleClickButton} />
      </div>
    </div>
  );
};
