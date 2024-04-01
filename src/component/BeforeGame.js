import React, { useEffect } from "react";
import Button from "../component/Button";
import { useLocation, useNavigate } from "react-router-dom";

const BeforeGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const num = location.state.num;

  const goStartGame = () => {
    navigate(`/game${num}`);
  };
  return (
    <div
      className={
        "flex flex-col justify-center items-center gap-5 my-auto h-full mx-5"
      }
    >
      <Button
        width="100%"
        height="60px"
        text="게임 시작하기"
        onClick={goStartGame}
      />
      <Button width="100%" height="60px" text="게임 설명보기" />
      <Button width="100%" height="60px" text="랭킹 보기" />
    </div>
  );
};

export default BeforeGame;
