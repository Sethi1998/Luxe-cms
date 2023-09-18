import Image from "next/image";
import React from "react";
interface CardProp {
  label: string;
  count: number;
  img: string;
}
export const Card = ({ label, count, img }: CardProp) => {
  return (
    <div className="flex border rounded-xl p-4 justify-between items-center w-[200px] bg-secondary">
      <div className="text-left">
        <h2>{label}</h2>
        <span className="text-lg font-bold">{count}</span>
      </div>
      <Image src={img} width={30} height={30} alt="user" />
    </div>
  );
};
