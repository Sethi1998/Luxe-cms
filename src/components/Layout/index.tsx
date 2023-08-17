import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <div className="flex-[.5]">
        <Sidebar />
      </div>
      <div className="flex-[2]">{children}</div>
    </div>
  );
};
