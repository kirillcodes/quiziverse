import { Card } from "@components";
import { useGetSignedCoursesQuery } from '@store/api/coursesApi';
import scss from "@styles/pages/Courses.module.scss";

type signedCourseType = {
  username: string;
  title: string;
  id: number;
}

export const Courses: React.FC = () => {
  const {data: signedCourses} = useGetSignedCoursesQuery({});

  return (
    <section className={scss.courses}>
      <div className={scss.title}>
        <h2 >Courses</h2>
        <div></div>
      </div>
      <div className={scss.cardList}>
        {signedCourses && signedCourses.map(({ username, title, id }: signedCourseType, index: number) => (
          <Card
            key={id}
            count={++index}
            id={id}
            title={title}
            author={username}
            imgURL="https://animesher.com/orig/1/125/1253/12539/animesher.com_nature-rain-1253935.gif"
          />
        ))}
      </div>
    </section>
  );
};
