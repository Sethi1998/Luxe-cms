import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className=" px-[25px] py-[80px] m-auto">{children}</div>;
};

export default Container;
