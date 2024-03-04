import React from "react";
import Search from "../assets/search.png";
import DementiaList from "../component/DementiaList";

const DementiaCenter = () => {
  return (
    <div className={"flex flex-col justify-start px-2.5 py-5 h-full gap-5"}>
      {/* 검색바 */}
      <div className="flex flex-row items-center border border-1 rounded-2xl gap-5 px-2.5 h-12 border-black">
        <img src={Search} className={"h-9 w-9"} />
        <input
          className="flex-grow border-none"
          placeholder="위치를 입력해주세요."
        />
      </div>
      {/* 치매센터리스트 */}
      <div className={"flex flex-col px-2.5"}>
        <DementiaList />
      </div>
    </div>
  );
};

export default DementiaCenter;
