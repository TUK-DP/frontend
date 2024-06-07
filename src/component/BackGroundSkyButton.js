import React from "react";

const BackGroundSkyButton = ({ text, onClick }) => {
  return (
    <div
      className={
        "flex justify-center items-center bg-[#E0F4FF] h-14 text-REMEMORY rounded-xl text-2xl font-bold"
      }
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default BackGroundSkyButton;
