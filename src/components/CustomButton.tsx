import React from "react";
import scss from "@styles/components/CustomButton.module.scss";

type CustomButtonProps = {
  title: string;
};

export const CustomButton: React.FC<CustomButtonProps> = ({ title }) => {
  return (
    <>
      <button type="button" className={scss.button}>
        {title}
      </button>
    </>
  );
};
