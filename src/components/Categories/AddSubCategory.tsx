import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { CategoriesProps } from ".";
import { PrimaryButton } from "../common/Button/PrimaryButton";
import { apiHandler } from "@/helpers/api";
import { addSubCategory, getSubCategories } from "@/helpers/api/constants";
import { CMSModal } from "@/context";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../common/Loader";
import { useRouter } from "next/router";
const SubCategorySchema = yup.object().shape({
  subCategoryName: yup.string().required("Name is required"),
});

interface ModalProps {
  label: string;
  setAddSubCategories: (value: boolean) => void;
  categoryData: CategoriesProps;
  subCategoryData?: any;
}
export const AddSubCategory = ({
  label,
  setAddSubCategories,
  categoryData,
}: ModalProps) => {
  const { loading,setLoading } = useContext(CMSModal);
const router =useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SubCategorySchema),
  });
  const submitHanldler = async (data: { subCategoryName: string }) => {
    setLoading(true);
    const input = {
      subCategoryName: data.subCategoryName,
      categoryId: categoryData._id,
    };
    const res = await apiHandler(`${addSubCategory}`, "POST", input);
    if (res.data.data) {
      setLoading(false);
      setAddSubCategories(false);
      router.push('/subCategory')
    }
  };
  return (
    <Modal close={() => setAddSubCategories(false)}>
      <h1 className="font-bold text-xl">
        {label} Sub Category for {categoryData.companyName}
      </h1>
      <div className="flex justify-center mt-2">
        <form
          className="flex flex-col gap-4 w-[50%]"
          onSubmit={handleSubmit(submitHanldler)}
        >
          <Input
            label="Sub Category Name"
            name="subCategoryName"
            type="text"
            error={errors.subCategoryName?.message}
            register={register}
          />
          <PrimaryButton label="Add Sub Category" />
        </form>
        {loading && <Loader />}
      </div>
    </Modal>
  );
};
