import React, { useEffect, useState } from "react";
import scss from "@styles/pages/TestPage.module.scss";
import { useGetTestQuery, useSubmitResultsMutation } from "@store/api/testsApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  AnswerItem,
  QuestionItem,
  ProgressController,
  CustomButton,
  MessageError,
} from "@components";

type PostData = {
  [key: number]: number;
};

export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const { courseId, testId } = useParams();
  const { data, isLoading, isError } = useGetTestQuery({ courseId, testId });
  const [postData, setPostData] = useState<PostData>({});
  const [timePassed, setTimePassed] = useState<number>(0);
  const [submitResults, { isLoading: isSending, isSuccess, isError: isErrorSending }] =
    useSubmitResultsMutation();

  useEffect(() => {
    if (isError || data?.status === 404 || data?.status === 403) {
      navigate("/not-found");
    }
  }, [isError, navigate, data]);

  useEffect(() => {
    if (data?.startDate) {
      const startTime = new Date(data.startDate).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - startTime;
      timeDifference < 0
        ? setTimePassed(data.timeLimit)
        : setTimePassed(Math.max(0, data.timeLimit - timeDifference / (1000 * 60)));
    }
  }, [data]);

  const selectAnswer = (quesitonId: number, answerIndex: number) => {
    setPostData((prevData) => ({
      ...prevData,
      [quesitonId]: answerIndex,
    }));
  };

  const submitData = () => {
    submitResults({ courseId, testId, ...postData });
  };

  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  if (isLoading || isSending) return <div>Loading...</div>;
  if (isErrorSending) return <MessageError title="Failed: Results was not received" />;
  if (isSuccess)
    return (
      <div className={scss.successed}>
        <h3>Successed: Wait for results announcements</h3>
        <CustomButton title="Back to course" handleSubmit={handleBackToCourse} />
      </div>
    );

  return (
    <div className={scss.testPage}>
      <h2>{data?.title}</h2>
      <ProgressController
        timeLimit={timePassed}
        totalAnswersCount={data?.questions?.length}
        selectedAnswersCount={Object.keys(postData).length}
        submitData={submitData}
      />
      <div className={scss.questionsList}>
        {data?.questions?.map((question, questionIndex) => (
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
      <CustomButton title="Finish" handleSubmit={submitData} style={{ marginTop: 10 }} />
    </div>
  );
};
