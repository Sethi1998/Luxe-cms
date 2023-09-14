/* eslint-disable @next/next/no-img-element */
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
import { DeleteCategories } from "./DeleteCategories";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export interface CategoriesProps {
  _id: string;
  vehicleName: string;
  vehicleImg: string;
}
export const Categories = () => {
  const [categorylabel, setCategoryLabel] = useState("");
  const [categoriesData, setCategoriesData] = useState<CategoriesProps[]>([]);
  const [addCategories, setAddCategories] = useState(false);
  const [deleteCategories, setDeleteCategories] = useState(false);
  const [categoryData, setCategoryData] = useState<CategoriesProps>({
    _id: "",
    vehicleImg: "",
    vehicleName: "",
  });
  const { loading, setLoading } = useContext(CMSModal);
  const router = useRouter();
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await apiHandler(`${getCategories}`, "GET");
      if (res.data.data) {
        setCategoriesData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
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
              handleClick={() => {
                setCategoryLabel("Add");
                setAddCategories(true);
              }}
            />
          </div>
          {categoriesData.length > 0 ? (
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
                        onClick={() => {
                          setCategoryLabel("Edit");
                          setAddCategories(true);
                          setCategoryData(item);
                        }}
                      />
                      <Image
                        src="/delete.png"
                        alt="edit"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => {
                          setCategoryData(item);
                          setDeleteCategories(true);
                        }}
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
          {addCategories && (
            <AddCategories
              label={categorylabel}
              fetchUser={fetchCategory}
              setAddCategories={setAddCategories}
              categoriesData={categoriesData}
              categoryData={categoryData}
            />
          )}
          {deleteCategories && (
            <DeleteCategories
              categoryData={categoryData}
              fetchData={fetchCategory}
              setDeleteCategories={setDeleteCategories}
            />
          )}
          {loading && <Loader />}
        </Container>
      </Layout>
    </div>
  );
};
