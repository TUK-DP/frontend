import React from "react";
import Button from "../component/Button";

const BeforeGame = () => {
  return (
    <div
      className={
        "flex flex-col justify-center items-center gap-5 my-auto h-full mx-5"
      }
    >
      <Button width="100%" height="60px" text="게임 시작하기" />
      <Button width="100%" height="60px" text="게임 설명보기" />
      <Button width="100%" height="60px" text="랭킹 보기" />
    </div>
  );
};

export default BeforeGame;
