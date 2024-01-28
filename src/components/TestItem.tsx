import scss from "@styles/components/TestItem.module.scss";
import { useState } from "react";
import { CustomButton } from "./CustomButton";

type TestItemProps = {
  title: string;
  createdAt: string;
  timeLimit: number;
};

export const TestItem: React.FC<TestItemProps> = ({ title, createdAt, timeLimit }) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleIsOpened = () => {
    setIsOpened((prev) => !prev);
  };

  const handleStartTest = () => {};

  return (
    <div className={scss.testItem} onClick={toggleIsOpened} style={isOpened ? { height: 110 } : {}}>
      <div className={scss.wrapper}>
        <h3>{title}</h3>
        <div>{createdAt}</div>
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
