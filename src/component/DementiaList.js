import React from "react";

const DementiaList = () => {
  return (
    <div
      className={
        "flex flex-col px-2.5 py-5 gap-2.5  border-b-2 border-neutral-300 text-lg"
      }
    >
      <div className={"text-[#82AAE3] "}>강서구치매안심센터</div>
      <div className={"flex flex-row gap-5"}>
        <div className={"font-semibold"}>1km</div>
        <div>서울 강서구 등촌동</div>
      </div>
    </div>
  );
};

export default DementiaList;
