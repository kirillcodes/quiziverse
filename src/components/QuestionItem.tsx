import React, { ReactElement, ReactNode } from "react";
import scss from "@styles/components/QuestionItem.module.scss";

type Props = {
  index: number;
  text: string;
  children: ReactNode | ReactElement;
};

export const QuestionItem: React.FC<Props> = ({ index, text, children, }) => {
  return (
    <div className={scss.questionItem}>
      <h3>
        {index}. {text}
      </h3>
      {children}
    </div>
  );
};
