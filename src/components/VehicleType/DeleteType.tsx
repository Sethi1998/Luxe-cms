import React, { useContext } from "react";
import { Modal } from "../common/Modal";
import { ButtonType, PrimaryButton } from "../common/Button/PrimaryButton";
import { CMSModal } from "@/context";
import { apiHandler } from "@/helpers/api";
import { deleteCompany, deleteVehicleType } from "@/helpers/api/constants";
import { TypesProps } from ".";
interface ModalProps {
  categoryData: TypesProps;
  setDeleteCategories: (value: boolean) => void;
  fetchData: () => void;
}
export const DeleteType = ({
  categoryData,
  setDeleteCategories,
  fetchData,
}: ModalProps) => {
  const { setLoading } = useContext(CMSModal);
  const deleteCategoryHandle = async () => {
    setLoading(true);
    const data = {
      id: categoryData._id,
    };
    const res = await apiHandler(`${deleteVehicleType}`, "POST", data);
    if (res) {
      fetchData();
      setDeleteCategories(false);
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal close={() => setDeleteCategories(false)}>
        <h1 className="text-cnter font-bold text-xl">
          Please Confirm to delete the Vehicle Type
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
