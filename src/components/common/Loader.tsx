import React from "react";
import HashLoader from "react-spinners/HashLoader";

export const Loader = () => {
  return (
    <div className="fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)]">
      <div className="relative left-[55%] top-[50%]">
        <HashLoader size={60} color="black" />
      </div>
    </div>
  );
};
