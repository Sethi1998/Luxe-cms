import { apiHandler } from "@/helpers/api";
import { getUsers } from "@/helpers/api/constants";
import React, { useContext, useEffect, useState } from "react";
import Container from "../common/Container";
import { Layout } from "../Layout";
import { CMSModal } from "@/context";
import { Loader } from "../common/Loader";
import { toast } from "react-hot-toast";

export interface UserProps {
  _id: string;
  profileImg: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
}

export enum UserRole {
  user = "user",
  owner = "owner",
  all = "all",
}
export const User = () => {
  const [usersData, setUsersData] = useState<UserProps[]>([]);
  const [filterUsers, setFilterUsers] = useState(UserRole.all);
  const { loading, setLoading } = useContext(CMSModal);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiHandler(`${getUsers}?filter=${filterUsers}`, "GET");
      if (res.data.data) {
        setUsersData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <Container>
        <h2 className="text-xl font-bold">User Listing</h2>
        <table className="mt-6 flex flex-col gap-4 w-full ">
          <thead className="text-center ">
            <tr className="grid grid-cols-3 gap-6 border-b">
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
            </tr>
          </thead>

          <tbody className="flex flex-col gap-4 text-center border-b">
            {usersData.map((item) => (
              <tr key={item._id} className="grid grid-cols-3 gap-6 border-b">
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <Loader />}
      </Container>
    </Layout>
  );
};
