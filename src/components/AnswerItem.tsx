import React from "react";
import scss from "@styles/components/AnswerItem.module.scss";

type Props = {
  value: number;
  handleSelect: () => void;
  checked: boolean;
  name: string;
  text: string;
};

export const AnswerItem: React.FC<Props> = ({ value, handleSelect, checked, name, text }) => {
  return (
    <div className={scss.answerItem}>
      <input
        type="radio"
        name={name}
        className={scss.answerInput}
        value={value}
        checked={checked}
        onChange={handleSelect}
      />
      {text}
    </div>
  );
};
