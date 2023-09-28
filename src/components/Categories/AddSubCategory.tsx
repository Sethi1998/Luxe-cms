import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { CategoriesProps } from ".";
import { PrimaryButton } from "../common/Button/PrimaryButton";
const SubCategorySchema = yup.object().shape({
  subCategoryName: yup.string().required(" Name is required"),
});

interface ModalProps {
  label: string;
  setAddSubCategories: (value: boolean) => void;
  categoryData: CategoriesProps;
  fetchUser?: () => void;
  subCategoryData?: any;
}
export const AddSubCategory = ({
  label,
  subCategoryData,
  setAddSubCategories,
  categoryData,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SubCategorySchema),
    values: {
      subCategoryName: label === "Add" ? "" : subCategoryData.subCategoryName,
    },
  });
  return (
    <Modal close={() => setAddSubCategories(false)}>
      <h1 className="font-bold text-xl">{label} Sub Category for {categoryData.companyName}</h1>
      <div className="flex justify-center mt-2">
        <form className="flex flex-col gap-4 w-[50%]">
          <Input
            label="Sub Category Name"
            name="subCategoryName"
            type="text"
            error={errors.subCategoryName?.message}
            register={register}
          />
          <PrimaryButton label="Add Sub Category"/>
        </form>
      </div>
    </Modal>
  );
};
