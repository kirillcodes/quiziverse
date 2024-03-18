import React, { useEffect, useState } from "react";
import scss from "@styles/pages/TestPage.module.scss";
import { useGetTestQuery } from "@store/api/testsApi";
import { useNavigate, useParams } from "react-router-dom";

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
          <div className={scss.question} key={question.id}>
            <h3>
              {questionIndex + 1}. {question.text}
            </h3>
            <ul className={scss.answersList}>
              {question.answers.map((answer, answerIndex) => (
                <li className={scss.answer} key={answerIndex}>
                  <input
                    type="radio"
                    className={scss.answerRadio}
                    value={answerIndex}
                    checked={postData[question.id] === answerIndex}
                    onChange={() => selectAnswer(question.id, answerIndex)}
                  />
                  {answer.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
