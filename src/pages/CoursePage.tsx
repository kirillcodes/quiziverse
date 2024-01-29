import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@store/api/coursesApi";
import { useEffect } from "react";
import scss from "@styles/pages/CoursePage.module.scss";
import { TestItem } from "@components/TestItem";
import { CustomButton } from "@components";

const tests = [
  {
    id: 1,
    title: "Super Quiz",
    timeLimit: 30,
    createdAt: "28.01.2024",
  },
];

export const CoursePage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { data: courseData, isError } = useGetCourseByIdQuery(id || "");
  const { id: courseId, author, title, description } = courseData || {};

  useEffect(() => {
    if (isError) {
      navigate("/not-found");
    }
  }, [navigate, isError]);

  // const toggleSubscribeCourse = () => {};

  const removeCourse = () => {};

  const addTest = () => {};

  return (
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
          <CustomButton title="Add test" handleSubmit={addTest} />
          <CustomButton
            title="Remove"
            handleSubmit={removeCourse}
            style={{ backgroundColor: "var(--red-color)" }}
          />
        </div>
      </div>
      <h3>List of tests:</h3>
      <div className={scss.testList}>
        {tests &&
          tests.map(({ id, title, timeLimit, createdAt }) => (
            <TestItem key={id} title={title} createdAt={createdAt} timeLimit={timeLimit} />
          ))}
      </div>
    </div>
  );
};
