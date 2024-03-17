import React from "react";
import Spinner from "../assets/Rolling-1.4s-254px.gif";

const Loading = ({ text }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="absolute  flex flex-col justify-center items-center w-4/5 h-1/3 max-w-[350px] max-h-[300px]">
        <img src={Spinner} width="60%" alt="LOADING" />
        <div className="text-white font-extrabold text-3xl">{text}</div>
      </div>
    </div>
  );
};

export default Loading;
