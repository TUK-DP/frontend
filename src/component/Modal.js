import React from "react";
import Button from "./Button";

const Modal = ({ isModalOpen, onClose, content }) => {
  if (!isModalOpen) return null;

  return (
    <div
      className={
        "w-full h-full fixed top-0 left-0 flex justify-center items-center bg-opacity-5 bg-black"
      }
    >
      <div className={"absolute bg-white w-4/5 h-fit py-7 px-3"}>
        <p className={"p-2 mb-5 text-xl break-keep text-center"}>{content}</p>
        <div className={"flex justify-end"}>
          <Button
            width={"100px"}
            height={"40px"}
            text={"닫기"}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
