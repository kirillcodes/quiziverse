import { MdEdit } from "react-icons/md";
import scss from "@styles/components/Card.module.scss";

type CardProps = {
  count: number;
  imgURL: string;
  title: string;
  author: string;
};

export const Card = ({ count, imgURL, title, author }: CardProps) => {
  return (
    <div className={scss.card}>
      <button>
        <MdEdit className={scss.plus} />
      </button>
      <img src={imgURL} />
      <div className={scss.info}>
        <h3>
          <span>{count}.</span> {title}
        </h3>
        <p>{author}</p>
      </div>
    </div>
  );
};
