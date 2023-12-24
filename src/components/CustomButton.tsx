import React, { CSSProperties } from "react";
import scss from "@styles/components/CustomButton.module.scss";

type CustomButtonProps = {
  title: string;
  handleSubmit: () => void;
  disabled?: boolean;
  style?: CSSProperties;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handleSubmit,
  disabled,
  style,
}) => {
  return (
    <>
      <button
        type="button"
        className={scss.button}
        onClick={handleSubmit}
        disabled={disabled}
        style={style}
      >
        {title}
      </button>
    </>
  );
};
