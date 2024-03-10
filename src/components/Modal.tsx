import React, { CSSProperties } from "react";
import scss from "@styles/components/Modal.module.scss";
import { MdClose } from "react-icons/md";

type ModalTypeProps = {
  children: React.ReactNode;
  handleModal: () => void;
  style?: CSSProperties;
};

export const Modal: React.FC<ModalTypeProps> = ({ children, handleModal, style }) => {
  const closeModalOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModal();
    }
  };

  return (
    <div className={scss.modal} onClick={(e) => closeModalOutside(e)}>
      <div className={scss.content} style={style}>
        <MdClose className={scss.close} onClick={handleModal} />
        {children}
      </div>
    </div>
  );
};
