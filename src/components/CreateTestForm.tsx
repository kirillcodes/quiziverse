import React, { useState } from "react";
import { CreateQuestionForm } from "./CreateQuestionForm";
import { CreateAnswerForm } from "./CreateAnswerForm";
import { CreateTestDto, QuestionDto, AnswerDto } from "@dto/create-test.dto";
import { useCreateTestMutation } from "@store/api/testsApi";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";

type Props = {
  courseId: string;
};

export const CreateTestForm: React.FC<Props> = ({ courseId }) => {
  const [createTestMutation] = useCreateTestMutation();
  const [formData, setFormData] = useState<CreateTestDto>({
    title: "",
    timeLimit: 0,
    startDate: new Date(),
    questions: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const addQuestion = (question: QuestionDto) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, question],
    }));
  };

  const addAnswer = (answer: AnswerDto, questionIndex: number) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            answers: [...question.answers, answer],
          };
        }
        return question;
      }),
    }));
  };

  const handleRightAnswerChange = (questionIndex: number, answerIndex: number) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...question,
            rightAnswer: answerIndex,
          };
        }
        return question;
      }),
    }));
  };

  const handleSubmit = async () => {
    try {
      await createTestMutation({ courseId, ...formData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label>
        Title:
        <CustomInput type="text" name="title" value={formData.title} handleInput={handleChange} />
      </label>
      <label>
        Time Limit (minutes):
        <CustomInput
          type="number"
          name="timeLimit"
          value={formData.timeLimit}
          handleInput={handleChange}
        />
      </label>
      {formData.questions.map((question, questionIndex) => (
        <div key={questionIndex} style={{ backgroundColor: "#555", padding: "10px", margin: "10px 0" }}>
          <p>
            Question {questionIndex + 1}: {question.text}
          </p>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>
                <input
                  type="radio"
                  name={`rightAnswer_${questionIndex}`}
                  value={answerIndex}
                  checked={question.rightAnswer === answerIndex}
                  onChange={() => handleRightAnswerChange(questionIndex, answerIndex)}
                />
                {answer.text}
              </li>
            ))}
          </ul>
          <CreateAnswerForm questionIndex={questionIndex} addAnswer={addAnswer} />
        </div>
      ))}
      <CreateQuestionForm addQuestion={addQuestion} />
      <CustomButton title="Create test" handleSubmit={handleSubmit} />
    </div>
  );
};
