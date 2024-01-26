import { MdEdit } from "react-icons/md";
import scss from "@styles/components/Card.module.scss";

type CardProps = {
  count: number;
  imgURL: string;
  title: string;
  author: string;
  id: number;
};

export const Card = ({ count, imgURL, title, author, id }: CardProps) => {
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
        <div>
          <p>{author}</p>
          <span>ID: {id}</span>
        </div>
      </div>
    </div>
  );
};
