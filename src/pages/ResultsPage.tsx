import React, { useState } from "react";
import scss from "@styles/pages/ResultsPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteTestMutation, useGetResultsListQuery } from "@store/api/testsApi";
import { calcPercentage } from "@utils";
import { CustomButton, Modal } from "@components";

type ResultItem = {
  username: string;
  userId: number;
  globalScore: number;
  score: number;
  testResultId: number;
};

export const ResultsPage: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const { courseId, testId } = useParams();
  const { data: resultsList, isLoading } = useGetResultsListQuery({ courseId, testId });
  const [deleteTest, { isSuccess: isSuccessDelete }] = useDeleteTestMutation();

  const handleUser = (userId: number) => {
    navigate(`/course/${courseId}/test/${testId}/results/${userId}`);
  };

  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  const handleCloseTest = () => {
    deleteTest({ courseId, testId });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isOpenModal) {
    return (
      <Modal handleModal={() => setIsOpenModal((prev) => !prev)}>
        {isSuccessDelete ? (
          <div className={scss.modal}>
            <h2>Test was deleted!</h2>
            <CustomButton title="Back to course" handleSubmit={handleBackToCourse} />
          </div>
        ) : (
          <div className={scss.modal}>
            <h2>Close test</h2>
            <p>
              <span>Important!</span> If you close the test, all results, including the test, are
              deleted permanently.
            </p>
            <CustomButton
              title="Close test"
              handleSubmit={handleCloseTest}
              style={{ backgroundColor: "var(--red-color)" }}
            />
          </div>
        )}
      </Modal>
    );
  }

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
            <div className={scss.resultItem} onClick={() => handleUser(userId)} key={testResultId}>
              <p className={scss.username}>{username}</p>
              <div className={scss.resultInfo}>
                <div className={scss.scale}>
                  <div
                    className={scss.fillScale}
                    style={{ width: `${calcPercentage(score, globalScore)}%` }}
                  ></div>
                </div>
                <span className={scss.scorePercentage}>
                  [ {calcPercentage(score, globalScore)}% ]
                </span>
                <span className={scss.score}>
                  {score} / {globalScore}
                </span>
              </div>
            </div>
          ))}
      </div>
      <CustomButton title="Go back" handleSubmit={handleBackToCourse} />
      <CustomButton
        title="Close test"
        handleSubmit={() => setIsOpenModal((prev) => !prev)}
        style={{ marginTop: 10, backgroundColor: "var(--red-color)" }}
      />
    </div>
  );
};
