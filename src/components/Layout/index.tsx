import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { CMSModal } from "@/context";
import { me } from "@/helpers/api/constants";
import { apiHandler } from "@/helpers/api";
import { Loader } from "../common/Loader";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  const { loading, setLoading } = useContext(CMSModal);
  const [userData, setUserData] = useState();
  const router = useRouter();
  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    setLoading(true);
    const res = await apiHandler(`${me}`, "GET");

    if (res.data.success === true) {
      setUserData(res.data.data);
      setLoading(false);
    }
    if (res.data.success === false) {
      setLoading(false);
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className="flex">
      <div className="flex-[.7]">
        <Sidebar />
      </div>
      <div className="flex-[2]">{children}</div>
    </div>
  );
};
