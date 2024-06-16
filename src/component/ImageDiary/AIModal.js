import React from "react";
import BackGroundSkyButton from "../BackGroundSkyButton";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AIModal = ({ onClose, content, keyword }) => {
  const navigate = useNavigate();
  const handleClickAIButton = () => {
    navigate("/draw/help", { state: { keyword: keyword } });
  };
  return (
    <div
      className={
        "w-full h-full fixed top-0 left-0 flex justify-center items-center bg-opacity-30 bg-black"
      }
    >
      <div className={"absolute bg-white w-4/5 h-fit py-7 px-3 rounded-2xl"}>
        <p
          className={
            "p-2 mb-5 text-xl break-keep text-center text-[#7D7D7D] font-semibold"
          }
        >
          {content}
        </p>
        <div className={"flex flex-col gap-2"}>
          <BackGroundSkyButton
            text="AI 도움 받기"
            onClick={handleClickAIButton}
          />
          <BackGroundSkyButton text="닫기" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AIModal;
