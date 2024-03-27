import React from "react";
import scss from "@styles/pages/ResultsPage.module.scss";
import { useParams } from "react-router-dom";
import { useGetResultsListQuery } from "@store/api/testsApi";
import { calcPercentage } from "@utils";

type ResultItem = {
  username: string;
  userId: number;
  globalScore: number;
  score: number;
  testResultId: number;
};

export const ResultsPage: React.FC = () => {
  const { courseId, testId } = useParams();
  const { data: resultsList, isLoading } = useGetResultsListQuery({ courseId, testId });
  const handleUser = (testResultId: number, userId: number) => {
    console.log(testResultId + " " + userId);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={scss.resultsPage}>
      <h2 className={scss.title}>Test results</h2>
      <div className={scss.aboutData}>
        <p>Name</p>
        <p>Score</p>
      </div>
      <div className={scss.line}></div>
      <div className={scss.usersList}>
        {resultsList &&
          resultsList.map(({ username, userId, globalScore, score, testResultId }: ResultItem) => (
            <div
              className={scss.resultItem}
              onClick={() => handleUser(testResultId, userId)}
              key={testResultId}
            >
              <p className={scss.username}>{username}</p>
              <div className={scss.resultInfo}>
                <div className={scss.scale}>
                  <div
                    className={scss.fillScale}
                    style={{ width: `${calcPercentage(score, globalScore)}%` }}
                  ></div>
                </div>
                <div className={scss.score}>
                  <span className={scss.scoreNum}>
                    {score} / {globalScore}
                  </span>
                  <span className={scss.scorePercentage}>
                    [ {calcPercentage(score, globalScore)}% ]
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
