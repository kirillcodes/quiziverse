import React from "react";
import scss from "@styles/components/CustomButton.module.scss";

type CustomButtonProps = {
  title: string;
  handleSubmit: () => void;
};

export const CustomButton: React.FC<CustomButtonProps> = ({ title, handleSubmit }) => {
  return (
    <>
      <button type="button" className={scss.button} onClick={handleSubmit}>
        {title}
      </button>
    </>
  );
};
