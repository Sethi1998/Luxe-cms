import { CMSModal } from "@/context";
import { apiHandler } from "@/helpers/api";
import { me } from "@/helpers/api/constants";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "./common/Loader";
import { UserProps } from "./User";
import { useRouter } from "next/router";

interface AuthProps {
  children: React.ReactNode;
}
export const UserContext = React.createContext<UserProps | null>(null);

export const Auth = ({ children }: AuthProps) => {
  const [meData, setMeData] = useState<UserProps>();
  const { loading, setLoading } = useContext(CMSModal);
  const router = useRouter();

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    setLoading(true);
    const res = await apiHandler(`${me}`, "GET");
    console.log(res, "data");
    if (res.data) {
      setMeData(res.data);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  console.log(meData, "meData");
  if (meData && meData.role === "admin") {
    return (
      <UserContext.Provider value={meData}>{children}</UserContext.Provider>
    );
  }
  if (typeof window === "undefined") return null;
  router.push("/login");
  // return (
  //   <div>
  //     <p>This page is authenticated you will be now redirected</p>
  //   </div>
  // );
};
