import React, { CSSProperties } from "react";
import scss from "@styles/components/CustomInput.module.scss";

type CustomInputProps = {
  type: "text" | "password" | "number" | "email";
  placeholder?: string;
  name?: string;
  value: string | number;
  style?: CSSProperties;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  name,
  value,
  handleInput,
  style,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={scss.input}
        value={value}
        onChange={(e) => handleInput(e)}
        style={style}
      />
    </>
  );
};
