import React, { useEffect, useState } from "react";
import Button from "../component/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";

const BeforeGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const num = location.state.num;
  const gameInfo = location.state.gameInfo;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goStartGame = () => {
    navigate(`/game${num}`);
  };

  useEffect(() => {
    console.log(num, gameInfo);
  });
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
      <Button
        width="100%"
        height="60px"
        text="게임 설명보기"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      />
      <Button width="100%" height="60px" text="랭킹 보기" />
      {isModalOpen && <Modal onClose={closeModal} content={gameInfo} />}
    </div>
  );
};

export default BeforeGame;
