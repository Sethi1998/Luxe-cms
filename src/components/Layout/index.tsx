import React from "react";
import Sidebar from "./Sidebar";
import { Auth } from "../Auth";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    // <Auth>
    <div className="flex">
      <div className="flex-[.5]">
        <Sidebar />
      </div>
      <div className="flex-[2]">{children}</div>
    </div>
    // </Auth>
  );
};
