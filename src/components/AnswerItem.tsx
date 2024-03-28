import React from "react";
import scss from "@styles/components/AnswerItem.module.scss";

type Props = {
  value: number;
  handleSelect?: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  checked?: boolean;
  disabled?: boolean;
  name: string;
  text: string;
  style?: React.CSSProperties;
};

export const AnswerItem: React.FC<Props> = ({
  value,
  handleSelect,
  checked,
  disabled,
  name,
  text,
  style,
}) => {
  return (
    <div className={scss.answerItem}>
      <input
        type="radio"
        name={name}
        className={scss.answerInput}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleSelect}
        style={style}
      />
      {text}
    </div>
  );
};
