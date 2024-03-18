import React, { useEffect, useState } from "react";
import scss from "@styles/pages/TestPage.module.scss";
import { useGetTestQuery } from "@store/api/testsApi";
import { useNavigate, useParams } from "react-router-dom";
import { AnswerItem, QuestionItem } from "@components";

type PostData = {
  [key: number]: number;
};

export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const { courseId, testId } = useParams();
  const { data, isLoading, isError } = useGetTestQuery({ courseId, testId });
  const [postData, setPostData] = useState<PostData>({});

  useEffect(() => {
    if (isError || data?.status === 404) {
      navigate("/not-found");
    }
  }, [isError, navigate, data]);

  const selectAnswer = (quesitonId: number, answerIndex: number) => {
    setPostData((prevData) => ({
      ...prevData,
      [quesitonId]: answerIndex,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={scss.testPage}>
      <h2>{data?.title}</h2>
      <div className={scss.questionsList}>
        {data?.questions.map((question, questionIndex) => (
          <QuestionItem index={questionIndex + 1} text={question.text} key={question.id}>
            <div className={scss.answersList}>
              {question.answers.map((answer, answerIndex) => (
                <AnswerItem
                  key={answer.id}
                  text={answer.text}
                  value={answerIndex}
                  name={"answer_" + answer.id}
                  handleSelect={() => selectAnswer(question.id, answerIndex)}
                  checked={postData[question.id] === answerIndex}
                />
              ))}
            </div>
          </QuestionItem>
        ))}
      </div>
    </div>
  );
};
