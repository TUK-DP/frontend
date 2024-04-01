import React from "react";
import gameImg1 from "../assets/gameImg1.png";
import gameImg2 from "../assets/gameImg2.png";
import gameImg3 from "../assets/gameImg3.png";
import gameImg4 from "../assets/gameImg4.png";
import gameImg5 from "../assets/gameImg5.png";
import { useNavigate } from "react-router-dom";
import BeforeGame from "../component/BeforeGame";

const Games = () => {
  const navigate = useNavigate();

  const goBeforeGame = (num) => {
    navigate("/beforegame", { state: { num } });
  };

  return (
    <div id="game">
      <div
        className="btn_games"
        onClick={() => {
          goBeforeGame(1);
        }}
      >
        <img src={gameImg1} />
        <div className="game_text">이모티콘 찾기</div>
      </div>
      <div
        className="btn_games"
        onClick={() => {
          goBeforeGame(2);
        }}
      >
        <img src={gameImg2} />
        <div className="game_text">지는 가위바위보</div>
      </div>
      <div
        className="btn_games"
        onClick={() => {
          goBeforeGame(3);
        }}
      >
        <img src={gameImg3} />
        <div className="game_text">컬러매치</div>
      </div>
      <div
        className="btn_games"
        onClick={() => {
          goBeforeGame(4);
        }}
      >
        <img src={gameImg4} />
        <div className="game_text">순서대로 터치</div>
      </div>
      <div
        className="btn_games"
        onClick={() => {
          goBeforeGame(5);
        }}
      >
        <img src={gameImg5} />
        <div className="game_text">알맞은 글자 연결</div>
      </div>
    </div>
  );
};

export default Games;
