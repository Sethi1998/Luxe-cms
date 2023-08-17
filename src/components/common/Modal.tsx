import React from "react";
import Image from "next/image";
interface ModalProps {
  children: React.ReactNode;
  close: (value: boolean) => void;
}
export const Modal = ({ children, close }: ModalProps) => {
  return (
    <div className="fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)]">
      <div className="relative left-[30%] top-[30%] bg-white w-[60%] p-6 rounded-md">
        <Image
          src="/close.png"
          alt="close"
          width={20}
          height={20}
          className="cursor-pointer absolute right-4"
          onClick={() => close(false)}
        />
        {children}
      </div>
    </div>
  );
};
