import React, { ReactElement, ReactNode } from "react";
import scss from "@styles/components/QuestionItem.module.scss";

type Props = {
  index: number;
  text: string;
  children: ReactNode | ReactElement;
  key?: React.Key;
};

export const QuestionItem: React.FC<Props> = ({ index, text, children, key }) => {
  return (
    <div className={scss.questionItem} key={key}>
      <h3>
        {index}. {text}
      </h3>
      {children}
    </div>
  );
};
