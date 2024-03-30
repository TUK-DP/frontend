import React from "react";

const Button = ({ width, height, text, onClick }) => {
  return (
    <div
      className={
        "flex justify-center items-center bg-[#82aae3] h-10 text-white rounded-xl text-xl font-bold"
      }
      style={{ width: `${width}`, height: `${height}` }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
