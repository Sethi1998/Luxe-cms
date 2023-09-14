import React, { useContext, useRef, useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { ButtonType, PrimaryButton } from "../common/Button/PrimaryButton";
import { apiHandler } from "@/helpers/api";
import { CMSModal } from "@/context";
import { CategoriesProps } from ".";
import { Loader } from "../common/Loader";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FileInput } from "../common/FileInput";
import { Toaster, toast } from "react-hot-toast";
import { createCompany, editCompany } from "@/helpers/api/constants";
interface ModalProps {
  label: string;
  setAddCategories: (value: boolean) => void;
  categoriesData: CategoriesProps[];
  categoryData: CategoriesProps;
  fetchUser: () => void;
}
// validation
const CategorySchema = yup.object().shape({
  companyName: yup.string().required(" Name is required"),
});

export const AddCategories = ({
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
    resolver: yupResolver(CategorySchema),
    values: {
      companyName: label === "Add" ? "" : categoryData.companyName,
    },
  });
  const [categoryFile, setCategoryFile] = useState<Blob>();
  const submitHandler = async (data: { companyName: string }) => {
    let res = [];
    let input = {};
    switch (label) {
      case "Add":
        console.log("asas");
        if (!categoryFile) return toast.error("Vehicle Image is required ");
        setLoading(true);
        input = {
          companyName: data.companyName,
          files: categoryFile,
        };
        res = await apiHandler(`${createCompany}`, "POST", input, "multipart");
        if (res.data.data) {
          fetchUser();
          setLoading(false);
          setAddCategories(false);
        }
        break;
      case "Edit":
        if (!categoryFile && !categoryData.companyImg)
          return toast.error("Vehicle Image is required ");
        setLoading(true);
        input = {
          _id: categoryData._id,
         companyName: data.companyName
            ? data.companyName
            : categoryData.companyName,
            companyImg: categoryData.companyImg,
          files: categoryFile,
        };
        res = await apiHandler(`${editCompany}`, "POST", input, "multipart");
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
        <h1 className="font-bold text-xl">{label} Category</h1>
        <div className="flex justify-center">
          <form
            className="flex flex-col gap-4 w-[50%]"
            onSubmit={handleSubmit((data) => {
              submitHandler(data);
            })}
          >
            <Input
              label="Company Name"
              name="companyName"
              type="text"
              error={errors.companyName?.message}
              register={register}
            />

            <FileInput
              name="companyImg"
              value={label === "Add" ? null : categoryData.companyImg}
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
