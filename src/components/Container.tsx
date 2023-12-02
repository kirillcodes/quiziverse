import { ReactNode } from "react";
import scss from "@styles/components/Container.module.scss";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className={scss.container}>{children}</div>;
};
