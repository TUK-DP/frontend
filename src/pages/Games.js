import React, { useEffect } from "react";
import gameImg1 from "../assets/gameImg1.png";
import gameImg2 from "../assets/gameImg2.png";
import gameImg3 from "../assets/gameImg3.png";
import gameImg4 from "../assets/gameImg4.png";
import gameImg5 from "../assets/gameImg5.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";

const Games = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "게임 선택 화면" });
  }, []);
  const navigate = useNavigate();

  const goBeforeGame = (num) => {
    console.log(gameInfo[1]);
    navigate("/beforegame", { state: { num, gameInfo: gameInfo[num - 1] } });
  };

  const gameInfo = [
    "이모티콘 찾기는 화면에 뜨는 이모티콘과 똑같은 모양이 이모티콘들을 선택하는 게임입니다!",
    "지는 가위바위보는 지는 사람이 승자입니다! 만약 컴퓨터가 보를 냈을 때 가위가 아닌 주먹을 내야 이길 수 있습니다!",
    "컬러매치는 단어의 색에 알맞는 보기를 선택하는 것입니다! 단어가 검정이라고 해도 단어의 색이 파랑이라면 파랑을 선택해야합니다!",
    "순서대로 터치는 화면에 뜨는 다양한 내용들을 순서대로 터치하는 게임입니다! 내용은 숫자일수도 알파벳일수도 가나다라일수도 있습니다!",
    "알맞은 글자연결은 두개의 카드를 골라서 알맞은 하나의 단어를 완성시키는 게임입니다!",
  ];

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
