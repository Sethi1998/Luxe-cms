import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../Layout";
import Container from "../common/Container";
import toast from "react-hot-toast";
import { getSubCategories } from "@/helpers/api/constants";
import { CMSModal } from "@/context";
import { apiHandler } from "@/helpers/api";
import Image from "next/image";
import { CategoriesProps } from "../Categories";

export interface SubCategoriesProps {
  _id: string;
  subCategoryName: string;
  categoryId: CategoriesProps;
}
export const SubCategory = () => {
  const [subCategoriesData, setSubCategoriesData] = useState<
    SubCategoriesProps[]
  >([]);
  const { loading, setLoading } = useContext(CMSModal);

  useEffect(() => {
    fetchSubCategory();
  }, []);
  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const res = await apiHandler(`${getSubCategories}`, "GET");
      if (res.data.data) {
        setLoading(false);
        setSubCategoriesData(res.data.data);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  console.log(subCategoriesData, "sucbb");

  return (
    <Layout>
      <Container>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Vehicle Sub Categories :</h2>
        </div>
        {subCategoriesData.length > 0 ? (
          <table className="mt-6 flex flex-col gap-4 w-full ">
            <thead className="text-center ">
              <tr className="grid grid-cols-3 gap-6 border-b">
                <td>Company Name</td>
                <td>Sub Category Name</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>

            <tbody className="flex flex-col gap-4 text-center border-b ">
              {subCategoriesData.map((item) => (
                <tr
                  key={item._id}
                  className="grid grid-cols-3 gap-6 border-b items-center "
                >
                    <td>{item.categoryId.companyName}</td>
                  <td>{item.subCategoryName}</td>
               
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
        ) : (
          <h2 className="font-bold text-lg text-secondary absolute top-[50%] left-[40%]">
            No Data To Show, Please Add Data By Clicking on Add Categories
            Button
          </h2>
        )}
      </Container>
    </Layout>
  );
};
