import { Card } from "@components";
import scss from "@styles/pages/Courses.module.scss";

export const Courses = () => {
  return (
    <section className={scss.courses}>
      <div className={scss.title}>
        <h2>Courses</h2>
        <div></div>
      </div>
      <div className={scss.cardList}>
        <Card
          count={1}
          imgURL="https://animesher.com/orig/1/125/1253/12539/animesher.com_nature-rain-1253935.gif"
          title="Data structures"
          author="kirillcodes"
        />
      </div>
    </section>
  );
};
