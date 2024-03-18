import React, { useEffect } from "react";
import scss from "@styles/pages/TestPage.module.scss";
import { useGetTestQuery } from "@store/api/testsApi";
import { useNavigate, useParams } from "react-router-dom";

export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const { courseId, testId } = useParams();

  const { data, isLoading, isError } = useGetTestQuery({ courseId, testId });

  useEffect(() => {
    if (isError || data?.status === 404) {
      navigate("/not-found");
    }
  }, [isError, navigate, data]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={scss.testPage}>
      <h2>{data?.title}</h2>

      <div className={scss.questionsList}>
        {data?.questions.map((question) => (
          <div className={scss.question} key={question.id}>
            <h3>{question.text}</h3>
            <div className={scss.answersList}>
              {question.answers.map((answer, index) => (
                <div className={scss.answer} key={index}>
                  {answer.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
