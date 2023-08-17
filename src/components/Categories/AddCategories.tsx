import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { PrimaryButton } from "../common/Button/PrimaryButton";

interface ModalProps {
  setAddCategories: (value: boolean) => void;
}
export const AddCategories = ({ setAddCategories }: ModalProps) => {
  const [categoryName, setcategoryName] = useState("");
  const [categoryFile, setCategoryFile] = useState<Blob>();
  return (
    <div>
      <Modal close={() => setAddCategories(false)}>
        <h1 className="font-bold text-xl">Add Category</h1>
        <div className="flex justify-center">
          <form className="flex flex-col gap-4 w-[50%]">
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
            <PrimaryButton label="Add Category" />
          </form>
        </div>
      </Modal>
    </div>
  );
};
