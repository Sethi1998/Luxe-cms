import React, { useContext, useRef, useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { ButtonType, PrimaryButton } from "../common/Button/PrimaryButton";
import { apiHandler } from "@/helpers/api";
import { CMSModal } from "@/context";
import { TypesProps } from ".";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FileInput } from "../common/FileInput";
import { Toaster, toast } from "react-hot-toast";
import {  createType, editType } from "@/helpers/api/constants";
interface ModalProps {
  label: string;
  setAddCategories: (value: boolean) => void;
  categoryData: TypesProps;
  fetchUser: () => void;
}
// validation
const TypeSchema = yup.object().shape({
  vehicleTypeName: yup.string().required(" Name is required"),
});

export const AddVehicleTypes = ({
  setAddCategories,
  categoryData,
  label,
  fetchUser,
}: ModalProps) => {
  const { setLoading } = useContext(CMSModal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TypeSchema),
    values: {
      vehicleTypeName: label === "Add" ? "" : categoryData.vehicleTypeName,
    },
  });
  const [categoryFile, setCategoryFile] = useState<Blob>();
  const submitHandler = async (data: { vehicleTypeName: string }) => {
    let res = [];
    let input = {};
    switch (label) {
      case "Add":
        if (!categoryFile) return toast.error("Vehicle Image is required ");
        setLoading(true);
        input = {
          vehicleTypeName: data.vehicleTypeName,
          files: categoryFile,
        };
        res = await apiHandler(`${createType}`, "POST", input, "multipart");
        if (res.data.data) {
          fetchUser();
          setLoading(false);
          setAddCategories(false);
        }
        break;
      case "Edit":
        if (!categoryFile && !categoryData.vehicleTypeImg)
          return toast.error("Type Image is required ");
        setLoading(true);
        input = {
          _id: categoryData._id,
          vehicleTypeName: data.vehicleTypeName
            ? data.vehicleTypeName
            : categoryData.vehicleTypeName,
          companyImg: categoryData.vehicleTypeImg,
          files: categoryFile,
        };
        res = await apiHandler(`${editType}`, "POST", input, "multipart");
        if (res.data.data) {
          fetchUser();
          setAddCategories(false);
        }
      default:
        break;
    }

    if (res?.data?.error) {
      setLoading(false);
      toast.error(res.data.error.message);
    }
  };

  return (
    <div>
      <Modal close={() => setAddCategories(false)}>
        <h1 className="font-bold text-xl">{label} Type</h1>
        <div className="flex justify-center">
          <form
            className="flex flex-col gap-4 w-[50%]"
            onSubmit={handleSubmit((data) => {
              submitHandler(data);
            })}
          >
            <Input
              label="Vehicle Type Name"
              name="vehicleTypeName"
              type="text"
              error={errors.vehicleTypeName?.message}
              register={register}
            />

            <FileInput
              name="vehicleTypeImg"
              value={label === "Add" ? null : categoryData.vehicleTypeImg}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files !== null) {
                  setCategoryFile(e.target.files[0]);
                }
              }}
            />

            <Toaster />
            <PrimaryButton
              label={label === "Add" ? "Add Category" : "Edit Category"}
              type={ButtonType.submit}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};
