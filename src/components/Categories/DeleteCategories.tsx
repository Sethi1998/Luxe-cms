import React, { useContext } from "react";
import { Modal } from "../common/Modal";
import { ButtonType, PrimaryButton } from "../common/Button/PrimaryButton";
import { CMSModal } from "@/context";
import { apiHandler } from "@/helpers/api";
import { deleteCatgeories } from "@/helpers/api/constants";
interface ModalProps {
  categoryId: string;
  setDeleteCategories: (value: boolean) => void;
  setDeleted: (value: boolean) => void;
}
export const DeleteCategories = ({
  categoryId,
  setDeleteCategories,
  setDeleted,
}: ModalProps) => {
  const { setLoading } = useContext(CMSModal);
  const deleteCategoryHandle = async () => {
    setLoading(true);
    const data = {
      id: categoryId,
    };
    const res = await apiHandler(`${deleteCatgeories}`, "POST", data);
    if (res) {
      setDeleteCategories(false);
      setDeleted(true);
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal close={() => setDeleteCategories(false)}>
        <h1 className="text-cnter font-bold text-xl">
          Please Confirm to delete the category
        </h1>
        <div className="mt-4 flex justify-center gap-4">
          <PrimaryButton
            label="Confirm"
            type={ButtonType.button}
            handleClick={deleteCategoryHandle}
          />
          <PrimaryButton
            label="Cancel"
            type={ButtonType.button}
            handleClick={() => setDeleteCategories(false)}
          />
        </div>
      </Modal>
    </div>
  );
};
