import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseByIdQuery,
  useSubscribeToCourseMutation,
  useUnsubscribeFromCourseMutation,
} from "@store/api/coursesApi";
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
    refetch: refetchCourseData,
  } = useGetCourseByIdQuery(id || "");
  const { id: courseId, author, title, description, isAuthor, isSubscribed } = courseData || {};

  useEffect(() => {
    if (isError) {
      navigate("/not-found");
    }
  }, [navigate, isError]);

  const {
    data: tests,
    isLoading: testsIsLoading,
    refetch: refetchTestsData,
  } = useGetTestsQuery(id || "");
  const sortedByDateTests: Test[] =
    tests &&
    tests
      .slice()
      .sort(
        (a: Test, b: Test) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

  const [subscribe, { isLoading: isLoadingSubscribe }] = useSubscribeToCourseMutation();
  const [unsubscribe, { isLoading: isLoadingUnsubscribe }] = useUnsubscribeFromCourseMutation();

  useEffect(() => {
    refetchCourseData().unwrap();
    refetchTestsData().unwrap();
  }, [refetchCourseData, refetchTestsData]);

  const toggleSubscribeCourse = async () => {
    if (courseData && isSubscribed) {
      await unsubscribe(id).unwrap();
    } else {
      await subscribe(id).unwrap();
    }

    refetchCourseData();
  };

  const removeCourse = () => {};

  const handleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  if (testsIsLoading || courseDataIsLoading) return <div>Loading...</div>;
  if (isOpenModal)
    return (
      <Modal handleModal={handleModal} style={{ width: 800, padding: 10 }}>
        <CreateTestForm courseId={courseId} />
      </Modal>
    );

  return (
    <>
      <div className={scss.coursePage}>
        <div className={scss.info}>
          <h1 className={scss.title}>{title}</h1>
          <span className={scss.id}>ID: {courseId}</span>
        </div>
        <p className={scss.description}>{description}</p>
        <div className={scss.toolsBlock}>
          <span className={scss.author}>{author}</span>
          <div className={scss.tools}>
            {courseData && isAuthor ? (
              <>
                <CustomButton title="Add test" handleSubmit={handleModal} />
                <CustomButton
                  title="Remove"
                  handleSubmit={removeCourse}
                  style={{ backgroundColor: "var(--red-color)" }}
                />
              </>
            ) : (
              <CustomButton
                title={isSubscribed ? "Unsubscribe" : "Subscribe"}
                handleSubmit={toggleSubscribeCourse}
                disabled={isLoadingSubscribe || isLoadingUnsubscribe}
                style={isSubscribed ? { backgroundColor: "var(--red-color)", width: 130 } : {}}
              />
            )}
          </div>
        </div>
        <h3>List of tests:</h3>
        <div className={scss.testList}>
          {sortedByDateTests.length
            ? sortedByDateTests.map(({ id, title, timeLimit, startDate }: Test) => (
                <TestItem
                  key={id}
                  testId={id}
                  title={title}
                  startDate={startDate}
                  timeLimit={timeLimit}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};
