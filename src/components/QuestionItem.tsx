import React, { ReactElement, ReactNode } from "react";
import scss from "@styles/components/QuestionItem.module.scss";

type Props = {
  index: number;
  text: string;
  style?: React.CSSProperties;
  children: ReactNode | ReactElement;
};

export const QuestionItem: React.FC<Props> = ({ index, text, style, children }) => {
  return (
    <div className={scss.questionItem} style={style}>
      <h3>
        {index}. {text}
      </h3>
      {children}
    </div>
  );
};
