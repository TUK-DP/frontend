import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackGroundSkyButton from "../../component/BackgroundSkyButton";
import Button from "../../component/Button";

const ShowAiResult = () => {
  const location = useLocation();
  const keyword = location.state.keyword;
  const navigate = useNavigate();
  return (
    <div className={"flex flex-col p-2 justify-center items-center h-full"}>
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
        className={
          "flex-1 flex flex-col justify-center items-center w-full gap-2"
        }
      >
        <BackGroundSkyButton
          text="다시 도움 받기"
          onClick={() => navigate(-1)}
        />
        <BackGroundSkyButton text="이 그림 사용하지 않기" />
      </div>
      <Button text="완료" width="100%" height="56px" fontSize="24px" />
    </div>
  );
};

export default ShowAiResult;
