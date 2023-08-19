import React, { useContext, useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { ButtonType, PrimaryButton } from "../common/Button/PrimaryButton";
import { createCategory } from "@/helpers/api/constants";
import { apiHandler } from "@/helpers/api";
import { CMSModal } from "@/context";
import { CategoriesProps } from ".";
import { Loader } from "../common/Loader";

interface ModalProps {
  label: string;
  setAddCategories: (value: boolean) => void;
  categoriesData: CategoriesProps[];
  setCategoriesData: (value: CategoriesProps[]) => void;
}
export const AddCategories = ({
  setAddCategories,
  categoriesData,
  setCategoriesData,
  label,
}: ModalProps) => {
  const [categoryName, setcategoryName] = useState("");
  const [categoryFile, setCategoryFile] = useState<Blob>();
  const { setLoading } = useContext(CMSModal);
  const addCategories = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      vehicleName: categoryName,
      files: categoryFile,
    };
    const res = await apiHandler(
      `${createCategory}`,
      "POST",
      data,
      "multipart"
    );
    if (res.data) {
      setCategoriesData([...categoriesData, res.data]);
      setLoading(false);
      setAddCategories(false);
    }
  };
  return (
    <div>
      <Modal close={() => setAddCategories(false)}>
        <h1 className="font-bold text-xl">{label} Category</h1>
        <div className="flex justify-center">
          <form
            className="flex flex-col gap-4 w-[50%]"
            onSubmit={addCategories}
          >
            <Input
              label="Category Name"
              handleChange={(e) => setcategoryName(e.target.value)}
              type="text"
            />
            <Input
              label="Choose File"
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files !== null) {
                  setCategoryFile(e.target.files[0]);
                }
              }}
              type="file"
            />
            <PrimaryButton label="Add Category" type={ButtonType.submit} />
          </form>
        </div>
      </Modal>
    </div>
  );
};
