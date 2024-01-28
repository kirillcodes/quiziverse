import { MdEdit } from "react-icons/md";
import scss from "@styles/components/Card.module.scss";
import { useNavigate } from "react-router-dom";

type CardProps = {
  id: number;
  title: string;
  author: string;
  imgURL: string;
  count: number;
};

export const Card = ({ count, imgURL, title, author, id }: CardProps) => {
  const navigate = useNavigate();

  const handleCard = () => {
    navigate(`/course/${id}`);
  };

  return (
    <div className={scss.card} onClick={handleCard}>
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
