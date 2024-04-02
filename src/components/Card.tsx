import { MdEdit } from "react-icons/md";
import scss from "@styles/components/Card.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSetCoverToCourseMutation } from "@store/api/coursesApi";
import { Modal } from "./Modal";
import { CustomButton } from "./CustomButton";
import { MessageError } from "./MessageError";

type CardProps = {
  id: number;
  title: string;
  author: string;
  count: number;
  refetchCourses: () => void;
  base64Image: string;
};

export const Card = ({ refetchCourses, count, title, author, id, base64Image }: CardProps) => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [setCover, { isSuccess }] = useSetCoverToCourseMutation();
  const [incorrentMessage, setIncorrectMessage] = useState<string | null>(null);

  const handleSetCoverToCourse = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      setCover({ id, imageData: formData }).unwrap();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setIncorrectMessage(null);
    if (file) {
      const maxSize = 500 * 1024;
      if (file.size <= maxSize) {
        const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
        if (allowedFormats.includes(file.type)) {
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onload = () => {
            setImageSrc(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setIncorrectMessage("Please select files with jpg, png or gif extensions.");
        }
      } else {
        setIncorrectMessage("Please select a file up to 500 KB in size");
      }
    }
  };

  const handleCard = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      navigate(`/course/${id}`);
    }
  };

  const handleEditButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModal((prev) => !prev);
    setImageSrc(null);
  };

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
      refetchCourses();
    }
  }, [isSuccess, refetchCourses]);

  if (isModal)
    return (
      <Modal handleModal={handleCloseModal}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", marginBottom: 20 }}>{title}</h3>
          {incorrentMessage && <MessageError title={incorrentMessage} />}
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Selected Image"
              style={{ width: 300, height: 145, objectFit: "cover", marginTop: 20 }}
            />
          )}
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              margin: "20px 0",
              backgroundColor: "var(--accent-color)",
              padding: 10,
              borderRadius: 5,
              border: "1px solid var(--gray-color)",
            }}
          />
          <CustomButton title="Set cover" handleSubmit={handleSetCoverToCourse} />
        </div>
      </Modal>
    );

  return (
    <div className={scss.card} onClick={(event) => handleCard(event)}>
      <button onClick={(event) => handleEditButton(event)}>
        <MdEdit className={scss.plus} />
      </button>
      <img
        src={
          base64Image
            ? `data:image/gif;base64, ${base64Image}`
            : "https://animesher.com/orig/1/125/1253/12539/animesher.com_nature-rain-1253935.gif"
        }
      />
      <div className={scss.info}>
        <div className={scss.wrapper}>
          <span className={scss.count}>{count}.</span>
          <h3 className={scss.title}>{title}</h3>
        </div>
        <div>
          <p>{author}</p>
          <span>ID: {id}</span>
        </div>
      </div>
    </div>
  );
};
