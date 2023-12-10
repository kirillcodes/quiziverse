import React from "react";
import scss from "@styles/components/CustomButton.module.scss";

type CustomButtonProps = {
  title: string;
  handleSubmit: () => void;
  disabled?: boolean;
};

export const CustomButton: React.FC<CustomButtonProps> = ({ title, handleSubmit, disabled }) => {
  return (
    <>
      <button type="button" className={scss.button} onClick={handleSubmit} disabled={disabled}>
        {title}
      </button>
    </>
  );
};
