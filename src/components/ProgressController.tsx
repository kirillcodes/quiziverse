import React, { useState, useEffect } from "react";
import scss from "@styles/components/ProgressController.module.scss";

type Props = {
  timeLimit: number | undefined;
  totalAnswersCount: number | undefined;
  selectedAnswersCount: number;
  submitData: () => void;
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if (seconds <= 0 && minutes <= 0) return "00:00";
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const ProgressController: React.FC<Props> = ({
  timeLimit,
  totalAnswersCount,
  selectedAnswersCount,
  submitData,
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  useEffect(() => {
    if (timeLimit) {
      setTimeLeft(timeLimit * 60);
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft ? prevTimeLeft - 1 : timeLimit;
          if (newTimeLeft <= 0) {
            setIsTimeUp(true);
            clearInterval(timer);
          }
          return newTimeLeft;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLimit]);

  useEffect(() => {
    if (isTimeUp) {
      submitData();
    }
  }, [isTimeUp, submitData]);

  const setColor = () => {
    if (timeLeft && timeLimit) {
      if (timeLeft <= (timeLimit * 60) / 8) {
        return {
          border: "1px solid hsla(0, 100%, 75%, 1)",
          backgroundColor: "hsla(0, 100%, 75%, 0.2)",
        };
      }

      if (timeLeft <= (timeLimit * 60) / 2) {
        return {
          border: "1px solid hsla(52, 100%, 56%, 1)",
          backgroundColor: "hsla(50, 100%, 75%, 0.2)",
        };
      }
    }

    return {};
  };

  return (
    <div className={scss.progressController}>
      <div className={scss.info} style={setColor()}>
        <span className={scss.counter}>
          {selectedAnswersCount}/{totalAnswersCount}
        </span>
        <span className={scss.timer}>{timeLeft !== null ? formatTime(timeLeft) : "00:00"}</span>
      </div>
    </div>
  );
};
