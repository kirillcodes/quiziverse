import React, { useEffect } from "react";
import scss from "@styles/pages/UserResults.module.scss";
import { useGetUserResultsQuery } from "@store/api/testsApi";
import { useParams } from "react-router-dom";
import { AnswerItem, MessageError, QuestionItem } from "@components";
import { calcPercentage } from "@utils";

type Answer = {
  id: number;
  text: string;
};

type Question = {
  id: number;
  text: string;
  rightAnswer: number;
  answers: Answer[];
};

type UserAnswer = {
  id: number;
  questionId: number;
  chosenAnswerId: number;
};

type TestResultData = {
  test: {
    title: string;
    questions: Question[];
  };
  user: {
    username: string;
    email: string;
  };
  userAnswers: UserAnswer[];
  score: number;
  globalScore: number;
};

type UserResultsParams = {
  courseId: string;
  testId: string;
  studentId: string;
};

type ErrorType = {
  data: {
    message: string;
  };
};

export const UserResults: React.FC = () => {
  const { courseId, testId, studentId } = useParams<UserResultsParams>();
  const { data, isError, isLoading, error } = useGetUserResultsQuery({
    courseId,
    testId,
    studentId,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    const { data: errorData } = error as ErrorType;
    return <MessageError title={errorData?.message} />;
  }

  const { test, user, userAnswers, score, globalScore } = data as TestResultData;

  return (
    <div className={scss.userResults}>
      <h2 className={scss.title}>{test.title}</h2>
      <div className={scss.user}>
        <h3 className={scss.userName}>
          {user.username}
          <br />
          <a href={"mailto:" + user.email}>{user.email}</a>
        </h3>
        <div className={scss.score}>
          {score}/{globalScore}
          <br />
          <span className={scss.percentage}>[ {calcPercentage(score, globalScore)}% ]</span>
        </div>
      </div>
      <div className={scss.questionList}>
        {test.questions.map((question, questionIndex) => (
          <QuestionBlock
            key={question.id}
            question={question}
            userAnswers={userAnswers}
            questionIndex={questionIndex + 1}
          />
        ))}
      </div>
    </div>
  );
};

type QuestionBlockProps = {
  questionIndex: number;
  question: Question;
  userAnswers: UserAnswer[];
};

const QuestionBlock: React.FC<QuestionBlockProps> = ({ question, userAnswers, questionIndex }) => {
  const isAnswered = userAnswers.find((answer) => answer.questionId === question.id);
  const chosenAnswerId = isAnswered ? isAnswered.chosenAnswerId : null;
  const isCorrect = chosenAnswerId === question.rightAnswer;

  return (
    <QuestionItem
      index={questionIndex}
      text={question.text}
      style={{
        border: `1px solid ${isAnswered ? (isCorrect ? "lightgreen" : "red") : "red"}`,
        backgroundColor: isAnswered
          ? isCorrect
            ? "hsla(120, 100%, 75%, 0.1)"
            : "hsla(0, 100%, 75%, 0.1)"
          : "hsla(0, 100%, 75%, 0.1)",
      }}
    >
      <div className={scss.answersList}>
        {question.answers.map((answer, answerIndex) => (
          <AnswerItem
            name={"answer_" + answer.id}
            text={answer.text}
            key={answer.id}
            style={{
              color: chosenAnswerId === answer.id ? (isCorrect ? "green" : "red") : "black",
            }}
            value={answer.id}
            checked={answerIndex === chosenAnswerId}
            handleSelect={(e) => e && e.preventDefault()}
          />
        ))}
      </div>
    </QuestionItem>
  );
};
