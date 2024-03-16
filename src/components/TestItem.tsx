import scss from "@styles/components/TestItem.module.scss";
import { useState } from "react";
import { CustomButton } from "./CustomButton";
import { convertDateFromISO } from "@utils";

type TestItemProps = {
  title: string;
  startDate: string;
  timeLimit: number;
};

export const TestItem: React.FC<TestItemProps> = ({ title, startDate, timeLimit }) => {
  const [isOpened, setIsOpened] = useState(false);
  const currentDate = convertDateFromISO(new Date().toISOString()).date;
  const isDateEqual = currentDate === convertDateFromISO(startDate).date;

  const toggleIsOpened = () => {
    setIsOpened((prev) => !prev);
  };

  const handleStartTest = () => {};

  return (
    <div
      className={`${scss.testItem} ${isDateEqual ? scss.borderedItem : ""}`}
      onClick={toggleIsOpened}
      style={isOpened ? { height: 110 } : {}}
    >
      <div className={scss.wrapper}>
        <h3>{title}</h3>
        <div>{convertDateFromISO(startDate).full}</div>
      </div>
      <div className={scss.allInfo}>
        <p>
          Time limit: <span>{timeLimit} min</span>
        </p>
        <CustomButton title="Start" handleSubmit={handleStartTest} />
      </div>
    </div>
  );
};
