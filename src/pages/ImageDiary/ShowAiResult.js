import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackGroundSkyButton from "../../component/BackGroundSkyButton";
import Button from "../../component/Button";
import { style } from "d3";

const ShowAiResult = () => {
  const location = useLocation();
  const keyword = location.state.keyword;
  const imageUrl = location.state.image;
  const fullWidth = location.state.fullWidth;
  const navigate = useNavigate();
  // 배경 투명도
  const bgOpacityList = ["30", "50", "70", "100"];
  const [bgOpacity, setBgOpacity] = useState("1");
  const [selectedOpacityIndex, setSelectedOpacityIndex] = useState(3);
  // 투명도 변경
  const changeOpacity = (item, index) => {
    setBgOpacity(parseInt(item) * 0.01);
    setSelectedOpacityIndex(index);
  };

  const saveEditImage = () => {};

  return (
    <div className={"flex flex-col p-2 justify-center items-center"}>
      <h1
        className={
          "flex items-center rounded-2xl h-16 w-full text-3xl justify-center"
        }
        style={{
          border: "1px solid black",
        }}
      >
        {keyword}
      </h1>
      <div
        className={" border-4 border-[#D9D9D9] my-2"}
        style={{ width: fullWidth, height: fullWidth }}
      >
        <img
          src={imageUrl}
          className={"object-fill w-full h-full"}
          style={{ opacity: bgOpacity }}
        />
      </div>
      <div className={"flex flex-col w-full items-center mb-4"}>
        <p className={"mb-2 pl-4 w-full text-left text-lg font-bold"}>
          배경 선명도 설정
        </p>
        <div className={"whitespace-nowrap overflow-x-scroll "}>
          {bgOpacityList.map((item, index) => (
            <button
              key={index}
              className={`${
                selectedOpacityIndex === index ? "bg-[#B0B0B0]" : "bg-[#EDEDED]"
              }  w-20 py-2 rounded-xl h-12 mr-2 justify-center`}
              onClick={() => {
                changeOpacity(item, index);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div
        className={
          "flex-1 flex flex-col justify-center items-center w-full gap-2 my-2"
        }
      >
        <BackGroundSkyButton
          text="다시 도움 받기"
          onClick={() => navigate(-1)}
        />
        <BackGroundSkyButton
          text="이 그림 사용하지 않기"
          onClick={() => navigate(-2)}
        />
        <BackGroundSkyButton text="완료" onClick={saveEditImage} />
      </div>
    </div>
  );
};

export default ShowAiResult;
