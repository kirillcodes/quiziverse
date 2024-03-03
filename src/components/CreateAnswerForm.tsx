import React, { useState } from "react";
import { AnswerDto } from "@dto/create-test.dto";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";

type Props = {
  addAnswer: (answer: AnswerDto, questionIndex: number) => void;
  questionIndex: number;
};

export const CreateAnswerForm: React.FC<Props> = ({ addAnswer, questionIndex }) => {
  const [answerText, setAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerText(e.target.value);
  };

  const handleAddAnswer = () => {
    if (answerText.trim() === "") return;
    addAnswer({ text: answerText, isCorrect }, questionIndex);
    setAnswerText("");
    setIsCorrect(false);
  };

  return (
    <div>
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
