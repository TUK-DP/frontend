import React from "react";
import gameImg1 from "../assets/gameImg1.png";
import gameImg2 from "../assets/gameImg2.png";
import gameImg3 from "../assets/gameImg3.png";
import gameImg4 from "../assets/gameImg4.png";
import gameImg5 from "../assets/gameImg5.png";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div id="game">
      <Link to="/game1" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="btn_games">
          <img src={gameImg1} alt="이모티콘 찾기"/>
          <div className="game_text">이모티콘 찾기</div>
        </div>
      </Link>
      <Link to="/game2" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="btn_games">
          <img src={gameImg2} alt="지는 가위바위보"/>
          <div className="game_text">지는 가위바위보</div>
        </div>
      </Link>
      <Link to="/game3" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="btn_games">
          <img src={gameImg3} alt="컬러매치"/>
          <div className="game_text">컬러매치</div>
        </div>
      </Link>
      <Link to="/game4" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="btn_games">
          <img src={gameImg4} alt="순서대로 터치"/>
          <div className="game_text">순서대로 터치</div>
        </div>
      </Link>
      <Link to="/game5" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="btn_games">
          <img src={gameImg5} alt="알맞은 글자 연결"/>
          <div className="game_text">알맞은 글자 연결</div>
        </div>
      </Link>
    </div>
  );
};

export default Games;
