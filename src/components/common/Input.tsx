import React from "react";
interface InputProps {
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}
export const Input = ({ label, handleChange, type }: InputProps) => {
  return (
    <div className="border-2 rounded p-2">
      <input
        name={label}
        placeholder={label}
        type={type}
        onChange={(e) => handleChange(e)}
        className="border-none outline-none w-full"
      />
    </div>
  );
};
