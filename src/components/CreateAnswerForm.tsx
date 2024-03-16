import React, { useState } from "react";
import { AnswerDto } from "@dto/create-test.dto";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";
import scss from "@styles/components/CreateAnswerForm.module.scss";

type Props = {
  addAnswer: (answer: AnswerDto, questionIndex: number) => void;
  questionIndex: number;
};

export const CreateAnswerForm: React.FC<Props> = ({ addAnswer, questionIndex }) => {
  const [answerText, setAnswerText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerText(e.target.value);
  };

  const handleAddAnswer = () => {
    if (answerText.trim() === "") return;
    addAnswer({ text: answerText }, questionIndex);
    setAnswerText("");
  };

  return (
    <div className={scss.answerForm}>
      <CustomInput
        type="text"
        placeholder="Enter answer"
        value={answerText}
        handleInput={handleTextChange}
      />
      <CustomButton title="Add Answer" handleSubmit={handleAddAnswer} />
    </div>
  );
};
