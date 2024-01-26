import { Card } from "@components";
import { useGetSignedCoursesQuery } from '@store/api/coursesApi';
import scss from "@styles/pages/Courses.module.scss";

type signedCourseType = {
  username: string;
  title: string;
  id: number;
}

export const Courses = () => {
  const {data: signedCourses} = useGetSignedCoursesQuery({});

  return (
    <section className={scss.courses}>
      <div className={scss.title}>
        <h2>Courses</h2>
        <div></div>
      </div>
      <div className={scss.cardList}>
        {signedCourses && signedCourses.map(({ username, title, id }: signedCourseType, index: number) => (
          <Card
            key={id}
            count={++index}
            imgURL="https://animesher.com/orig/1/125/1253/12539/animesher.com_nature-rain-1253935.gif"
            title={title}
            author={username}
            id={id}
          />
        ))}
      </div>
    </section>
  );
};
