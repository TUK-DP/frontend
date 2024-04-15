import React from "react";
import { useNavigate } from "react-router-dom";

const GymButton = ({ src, title, time, content }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/gymvideo", { state: { src, content } });
  };

  return (
    <div
      className={
        "w-11/12 h-20 bg-[#E0F4FF] rounded-xl flex flex-col justify-center items-start px-5 gap-1 shadow-md"
      }
      onClick={handleClick}
    >
      <img />
      <p className={"text-xl font-semibold"}>{title}</p>
      <p className={"text-gray-500"}>{time}</p>
    </div>
  );
};

export default GymButton;
