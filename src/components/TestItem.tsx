import scss from "@styles/components/TestItem.module.scss";
import { useState } from "react";
import { CustomButton } from "./CustomButton";
import { convertDateFromISO } from "@utils";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useGetRoleQuery } from "@store/api/authApi";

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
  const { data: roleData } = useGetRoleQuery({});

  const currentLocation = window.location.pathname;

  const toggleIsOpened = () => {
    setIsOpened((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  const handleStart = () => {
    navigate(currentLocation + "/test/" + testId);
  };

  const handleShowResults = () => {
    navigate(currentLocation + "/test/" + testId + "/results");
  };

  const isDisabledButton = () => {
    const currentTime = new Date().getTime();
    const timeLimitMilliseconds = timeLimit * 60 * 1000;
    const endTime = new Date(startDate).getTime() + timeLimitMilliseconds;
    return endTime > currentTime;
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
        <CustomButton
          title={roleData && roleData.role === "TEACHER" ? "Results" : "Start"}
          handleSubmit={roleData && roleData.role === "TEACHER" ? handleShowResults : handleStart}
          disabled={roleData && roleData.role === "TEACHER" && isDisabledButton()}
        />
      </div>
    </div>
  );
};
