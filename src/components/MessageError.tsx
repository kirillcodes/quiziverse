import React from "react";

import scss from "@styles/components/MessageError.module.scss";

type MessageErrorProps = {
  title: string;
};

export const MessageError: React.FC<MessageErrorProps> = ({ title }) => {
  return <div className={scss.message}>{title}</div>;
};
