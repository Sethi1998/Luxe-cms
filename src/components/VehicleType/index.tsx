import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../Layout";
import Container from "../common/Container";
import { PrimaryButton } from "../common/Button/PrimaryButton";
import { AddVehicleTypes } from "./AddTypes";
import { CMSModal } from "@/context";
import { apiHandler } from "@/helpers/api";
import { getTypes } from "@/helpers/api/constants";
import toast from "react-hot-toast";
import Image from "next/image";
import { DeleteType } from "./DeleteType";

export interface TypesProps {
  _id: string;
  vehicleTypeName: string;
  vehicleTypeImg: string;
}
export const VehicleType = () => {
  const [typeLabel, setTypeLabel] = useState("");
  const [addType, setAddType] = useState(false);
  const [typesData, setTypesData] = useState<TypesProps[]>([]);
  const [typeData, setTypeData] = useState<TypesProps>({
    _id: "",
    vehicleTypeName: "",
    vehicleTypeImg: "",
  });
  const [deleteCategory, setDeleteCategory] = useState(false);
  const { loading, setLoading } = useContext(CMSModal);
  useEffect(() => {
    fetchType();
  }, []);

  const fetchType = async () => {
    try {
      setLoading(true);
      const res = await apiHandler(`${getTypes}`, "GET");
      if (res.data.success === true) {
        toast.success(res.data.message);
        setTypesData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <Container>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Vehicle Types :</h2>
          <PrimaryButton
            label="Add Types"
            handleClick={() => {
              setTypeLabel("Add");
              setAddType(true);
            }}
          />
        </div>
        {typesData.length > 0 ? (
          <table className="mt-6 flex flex-col gap-4 w-full ">
            <thead className="text-center ">
              <tr className="grid grid-cols-3 gap-6 border-b">
                <td>Vehicle Type Name</td>
                <td>Vehicle Type Img</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-4 text-center border-b ">
              {typesData.map((item) => (
                <tr
                  key={item._id}
                  className="grid grid-cols-3 gap-6 border-b items-center"
                >
                  <td>{item.vehicleTypeName}</td>
                  <td className="flex justify-center items-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_IMG_URL}/${item.vehicleTypeImg}`}
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
                        setTypeLabel("Edit");
                        setAddType(true);
                        setTypeData(item);
                      }}
                    />
                    <Image
                      src="/delete.png"
                      alt="edit"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => {
                        setTypeData(item);
                        setDeleteCategory(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="font-bold text-lg text-secondary absolute top-[50%] left-[40%]">
            No Data To Show, Please Add Data By Clicking on Add Type Button
          </h2>
        )}
        {addType && (
          <AddVehicleTypes
            label={typeLabel}
            fetchUser={fetchType}
            setAddCategories={setAddType}
            categoryData={typeData}
          />
        )}
        {deleteCategory && (
          <DeleteType
            categoryData={typeData}
            fetchData={fetchType}
            setDeleteCategories={setDeleteCategory}
          />
        )}
      </Container>
    </Layout>
  );
};
