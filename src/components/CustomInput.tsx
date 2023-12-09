import React from "react";
import scss from "@styles/components/CustomInput.module.scss";

type CustomInputProps = {
  type: "text" | "password" | "number" | "email";
  placeholder?: string;
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  value,
  handleInput,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={scss.input}
        value={value}
        onChange={(e) => handleInput(e)}
      />
    </>
  );
};
