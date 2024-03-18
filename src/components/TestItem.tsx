import scss from "@styles/components/TestItem.module.scss";
import { useState } from "react";
import { CustomButton } from "./CustomButton";
import { convertDateFromISO } from "@utils";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";

type TestItemProps = {
  testId: number;
  title: string;
  startDate: string;
  timeLimit: number;
};

export const TestItem: React.FC<TestItemProps> = ({ testId, title, startDate, timeLimit }) => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const currentDate = convertDateFromISO(new Date().toISOString()).date;
  const isDateEqual = currentDate === convertDateFromISO(startDate).date;

  const [isModal, setIsModal] = useState(false);

  const toggleIsOpened = () => {
    setIsOpened((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  const handleStart = () => {
    navigate(window.location.pathname + "/test/" + testId);
  };

  if (isModal)
    return (
      <Modal handleModal={toggleModal}>
        <h2>Do you really want to start the test?</h2>
        <span>[this action cannot be undone]</span>
        <CustomButton title="Start" handleSubmit={handleStart} />
      </Modal>
    );

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
        <CustomButton title="Start" handleSubmit={toggleModal} />
      </div>
    </div>
  );
};
