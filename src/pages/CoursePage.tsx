import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@store/api/coursesApi";
import { useEffect } from "react";
import scss from "@styles/pages/CoursePage.module.scss";
import { TestItem } from "@components/TestItem";

export const CoursePage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { data: courseData, isError } = useGetCourseByIdQuery(id || "");
  const { id: courseId, username, title, description } = courseData || {};

  useEffect(() => {
    if (isError) {
      navigate("/not-found");
    }
  }, [navigate, isError]);

  return (
    <div className={scss.coursePage}>
      <div className={scss.info}>
        <h1 className={scss.title}>{title}</h1>
        <span className={scss.id}>ID: {courseId}</span>
      </div>
      <p className={scss.description}>{description}</p>
      <span className={scss.author}>{username}</span>
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
