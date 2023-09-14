import React, { useRef, useState } from "react";
import { ButtonType, PrimaryButton } from "./Button/PrimaryButton";

interface FileInputProps {
  name: string;
  error?: string;
  value?: any;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const FileInput = ({
  name,
  error,
  handleChange,
  value,
}: FileInputProps) => {
  const [fileValue, setFileValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      {fileValue ? (
        <div className="flex w-full">
          <p>{value}</p>
          <div className="w-52">
            <PrimaryButton
              label="Change Img"
              handleClick={() => {
                setFileValue("");
              }}
              type={ButtonType.button}
            />
          </div>
        </div>
      ) : (
        <input
          type="file"
          className="border-none outline-none w-full"
          onChange={handleChange}
        />
      )}

      <p className="p-1 text-error font-semibold">{error && error}</p>
    </div>
  );
};
