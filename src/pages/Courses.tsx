import { Card } from "@components";
import { useGetSignedCoursesQuery } from "@store/api/coursesApi";
import scss from "@styles/pages/Courses.module.scss";

type signedCourseType = {
  author: string;
  title: string;
  id: number;
  base64Image: string;
};

export const Courses: React.FC = () => {
  const { data: signedCourses, refetch } = useGetSignedCoursesQuery({});

  return (
    <section className={scss.courses}>
      <div className={scss.title}>
        <h2>Courses</h2>
        <div></div>
      </div>
      <div className={scss.cardList}>
        {signedCourses &&
          signedCourses.map(
            ({ author, title, id, base64Image }: signedCourseType, index: number) => (
              <Card
                key={index}
                count={index + 1}
                id={id}
                title={title}
                refetchCourses={refetch}
                author={author}
                base64Image={base64Image}
              />
            )
          )}
      </div>
    </section>
  );
};
