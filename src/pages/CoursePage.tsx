import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@store/api/coursesApi";
import { useEffect, useState } from "react";
import scss from "@styles/pages/CoursePage.module.scss";
import { TestItem } from "@components/TestItem";
import { CustomButton, Modal } from "@components";
import { CreateTestForm } from "@components/CreateTestForm";
import { useGetTestsQuery } from "@store/api/testsApi";

type Test = {
  id: number;
  startDate: string;
  timeLimit: number;
  title: string;
};

export const CoursePage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { id } = useParams<{ id: string }>();
  const {
    data: courseData,
    isError,
    isLoading: courseDataIsLoading,
  } = useGetCourseByIdQuery(id || "");
  const { id: courseId, author, title, description } = courseData || {};

  useEffect(() => {
    if (isError) {
      navigate("/not-found");
    }
  }, [navigate, isError]);

  const { data: tests, isLoading: testsIsLoading } = useGetTestsQuery(id || "");
  const sortedByDateTests: Test[] =
    tests &&
    tests
      .slice()
      .sort(
        (a: Test, b: Test) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

  // const toggleSubscribeCourse = () => {};

  const removeCourse = () => {};

  const handleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  if (testsIsLoading || courseDataIsLoading) return <div>Loading...</div>;

  return (
    <>
      {isOpenModal && (
        <Modal handleModal={handleModal} style={{ width: 800, padding: 10 }}>
          <CreateTestForm courseId={courseId} />
        </Modal>
      )}
      <div className={scss.coursePage}>
        <div className={scss.info}>
          <h1 className={scss.title}>{title}</h1>
          <span className={scss.id}>ID: {courseId}</span>
        </div>
        <p className={scss.description}>{description}</p>
        <div className={scss.toolsBlock}>
          <span className={scss.author}>{author}</span>
          <div className={scss.tools}>
            {/* <CustomButton title="Subscribe" handleSubmit={toggleSubscribeCourse} /> */}
            <CustomButton title="Add test" handleSubmit={handleModal} />
            <CustomButton
              title="Remove"
              handleSubmit={removeCourse}
              style={{ backgroundColor: "var(--red-color)" }}
            />
          </div>
        </div>
        <h3>List of tests:</h3>
        <div className={scss.testList}>
          {sortedByDateTests.length &&
            sortedByDateTests.map(({ id, title, timeLimit, startDate }: Test) => (
              <TestItem
                key={id}
                testId={id}
                title={title}
                startDate={startDate}
                timeLimit={timeLimit}
              />
            ))}
        </div>
      </div>
    </>
  );
};
