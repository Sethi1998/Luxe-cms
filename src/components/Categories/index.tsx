import { apiHandler } from "@/helpers/api";
import { getCategories } from "@/helpers/api/constants";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Layout } from "../Layout";
import Container from "../common/Container";
import { PrimaryButton } from "../common/Button/PrimaryButton";
import { AddCategories } from "./AddCategories";
import { CMSModal } from "@/context";
import { Loader } from "../common/Loader";

interface CategoriesProps {
  _id: string;
  vehicleName: string;
  vehicleImg: string;
}
export const Categories = () => {
  const [categoriesData, setCategoriesData] = useState<CategoriesProps[]>([]);
  const [addCategories, setAddCategories] = useState(false);
  const { loading, setLoading } = useContext(CMSModal);

  useEffect(() => {
    const data = fetchUsers();
  }, []);
  const fetchUsers = async () => {
    setLoading(true);
    const res = await apiHandler(`${getCategories}`, "GET");
    if (res.data) {
      setCategoriesData(res.data);
      setLoading(false);
    }
  };
  return (
    <div>
      <Layout>
        <Container>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Vehicle Categories :</h2>
            <PrimaryButton
              label="Add  Categories"
              handleClick={() => setAddCategories(true)}
            />
          </div>
          <table className="mt-6 flex flex-col gap-4 w-full ">
            <thead className="text-center ">
              <tr className="grid grid-cols-3 gap-6 border-b">
                <td>Category Name</td>
                <td>Category Img</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>

            <tbody className="flex flex-col gap-4 text-center border-b ">
              {categoriesData.map((item) => (
                <tr
                  key={item._id}
                  className="grid grid-cols-3 gap-6 border-b items-center"
                >
                  <td>{item.vehicleName}</td>
                  <td className="flex justify-center items-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_IMG_URL}${item.vehicleImg}`}
                      alt="img"
                      width={20}
                      height={20}
                    />
                  </td>
                  <td className="flex justify-center gap-4">
                    <Image
                      src="/edit.png"
                      alt="edit"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                    />
                    <Image
                      src="/delete.png"
                      alt="edit"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {addCategories && (
            <AddCategories setAddCategories={setAddCategories} />
          )}
          {loading && <Loader />}
        </Container>
      </Layout>
    </div>
  );
};
