import React from "react";
import scss from "@styles/components/CustomInput.module.scss";

type CustomInputProps = {
  type: "text" | "password" | "number" | "email";
  placeholder?: string;
};

export const CustomInput: React.FC<CustomInputProps> = ({ type, placeholder }) => {
  return (
    <>
      <input type={type} placeholder={placeholder} className={scss.input} />
    </>
  );
};
