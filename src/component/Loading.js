import React from "react";
import Spinner from "../assets/Rolling-1.4s-254px.gif";
const Loading = ({ text }) => {
  return (
    <div className="absolute bg-black bg-opacity-50 flex flex-col justify-center items-center w-4/5 h-1/3 top-[30%] left-[10%]">
      <img src={Spinner} width="60%" alt="LOADING" />
      <div className={"text-white font-extrabold text-3xl"}>{text}</div>
    </div>
  );
};

export default Loading;
