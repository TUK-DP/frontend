import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import BackGroundSkyButton from "../../component/BackGroundSkyButton";
import { imageState } from "../../recoil/keywordState";

const ShowAiResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useRecoilState(imageState);

  const keyword = location.state.keyword;
  const imageUrl = location.state.image;
  const fullWidth = location.state.fullWidth;
  // 배경 투명도
  const [bgOpacity, setBgOpacity] = useState(1);
  const bgOpacityList = ["30", "50", "70", "100"];
  const [selectedOpacityIndex, setSelectedOpacityIndex] = useState(3);

  // 투명도 변경
  const changeOpacity = (item, index) => {
    setBgOpacity(parseInt(item) * 0.01);
    setSelectedOpacityIndex(index);
  };
  // 이미지 저장
  const saveEditImage = () => {
    const newImage = {
      keyword: keyword,
      imageUrl: imageUrl,
      bgOpacity: bgOpacity,
    };

    setImage((prevImage) => {
      // 같은 키워드에 2번 도움받는 경우, 기존 키워드의 이미지 덮어쓰기
      const existingIndex = prevImage.findIndex(
        (image) => image.keyword === keyword
      );

      if (existingIndex !== -1) {
        // 같은 keyword를 가진 항목이 이미 존재하는 경우, 해당 항목을 업데이트
        const updatedImages = [...prevImage];
        updatedImages[existingIndex] = newImage;
        return updatedImages;
      } else {
        // 같은 keyword를 가진 항목이 존재하지 않는 경우, 새 항목 추가
        return [...prevImage, newImage];
      }
    });

    navigate("/draw");
  };

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
