import React, { useEffect, useState } from "react";
import Button from "../../component/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../component/Modal";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";

const BeforeGame = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "게임 선택 화면" });
  }, []);
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
      <Modal
        onClose={closeModal}
        content={gameInfo}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default BeforeGame;
