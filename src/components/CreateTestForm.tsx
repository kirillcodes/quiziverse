import React, { useEffect, useState } from "react";
import { CreateQuestionForm } from "./CreateQuestionForm";
import { CreateAnswerForm } from "./CreateAnswerForm";
import { CreateTestDto, QuestionDto, AnswerDto } from "@dto/create-test.dto";
import { useCreateTestMutation } from "@store/api/testsApi";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import scss from "@styles/components/CreateTestForm.module.scss";

type Props = {
  courseId: string;
};

export const CreateTestForm: React.FC<Props> = ({ courseId }) => {
  const [createTestMutation] = useCreateTestMutation();
  const [totalPoints, setTotalPoints] = useState(0);
  const [formData, setFormData] = useState<CreateTestDto>({
    title: "",
    timeLimit: 0,
    startDate: new Date(),
    questions: [],
  });

  useEffect(() => {
    const calculateTotalPoints = () => {
      let total = 0;
      formData.questions.forEach((question) => {
        total += question.points || 0;
      });
      setTotalPoints(total);
    };

    calculateTotalPoints();
  }, [formData.questions])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date || new Date(),
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

  const handleRightAnswerChange = (questionIndex: number, answerIndex: number, points: number) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...question,
            rightAnswer: answerIndex,
            points: points,
          };
        }
        return question;
      }),
    }));
  };

  const handlePointsChange = (questionIndex: number, points: number) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...question,
            points: points,
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
    <div className={scss.questionForm}>
      <h2>Create test</h2>
      <div className={scss.titleBlock}>
        <h3>Title:</h3>
        <CustomInput
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          handleInput={handleChange}
        />
      </div>
      <div className={scss.timeLimitBlock}>
        <h3>Time Limit (minutes):</h3>
        <CustomInput
          type="number"
          name="timeLimit"
          placeholder="0"
          value={formData.timeLimit}
          handleInput={handleChange}
        />
      </div>
      <div className={scss.additionalSettings}>
        <h3 className={scss.totalScore}>Total score: <span>{totalPoints}</span></h3>
        <div className={scss.datePicker}>
          <h3 className={scss.startDate}>Start Date:</h3>
          <DatePicker
            showIcon
            closeOnScroll
            customInput={
              <CustomInput
                type="text"
                name="startDate"
                placeholder="Select start date"
                value={formData.startDate.toString()}
                handleInput={() => {}}
                style={{width: 190}}
              />
            }
            selected={formData.startDate}
            onChange={handleDateChange}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="dd/MM/yyyy h:mm aa"
            minDate={new Date()}
          />
        </div>
      </div>
      {formData.questions.length ? (
        <div className={scss.questionList}>
          {formData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className={scss.questionBlock}>
              <p>
                {questionIndex + 1}: {question.text}
              </p>
              <div className={scss.pointsBlock}>
                <span>Points:</span>
                <CustomInput
                  type="number"
                  value={question.points}
                  handleInput={(e) => handlePointsChange(questionIndex, parseInt(e.target.value))}
                  style={{ width: 80 }}
                />
              </div>
              <ul>
                {question.answers.map((answer, answerIndex) => (
                  <li key={answerIndex}>
                    <input
                      type="radio"
                      name={`rightAnswer_${questionIndex}`}
                      value={answerIndex}
                      checked={question.rightAnswer === answerIndex}
                      onChange={() =>
                        handleRightAnswerChange(questionIndex, answerIndex, question.points)
                      }
                    />
                    {answer.text}
                  </li>
                ))}
              </ul>
              <CreateAnswerForm questionIndex={questionIndex} addAnswer={addAnswer} />
            </div>
          ))}
        </div>
      ) : null}
      <CreateQuestionForm addQuestion={addQuestion} />
      <CustomButton
        title="Create"
        handleSubmit={handleSubmit}
        disabled={formData.questions.length && formData.title && formData.timeLimit ? false : true}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
};
