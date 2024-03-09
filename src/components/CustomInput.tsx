import React, { CSSProperties, forwardRef } from "react";
import scss from "@styles/components/CustomInput.module.scss";

type CustomInputProps = {
  type: "text" | "password" | "number" | "email";
  placeholder?: string;
  name?: string;
  value: string | number;
  style?: CSSProperties;
  readOnly?: true | false;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({
  type,
  placeholder,
  name,
  value,
  handleInput,
  style,
  readOnly = false,
  onClick,
}, ref) => {
  return (
    <>
      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        className={scss.input}
        value={value}
        onChange={(e) => handleInput && handleInput(e)}
        style={style}
        readOnly={readOnly}
        onClick={onClick}
      />
    </>
  );
});