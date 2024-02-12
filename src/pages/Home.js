import React from "react";
import "../index.css";
import mainBtn1 from "../assets/mainBtn1.png";
import mainBtn2 from "../assets/mainBtn2.png";
import mainBtn3 from "../assets/mainBtn3.png";
import mainBtn4 from "../assets/mainBtn4.png";
import mainBtn5 from "../assets/mainBtn5.png";

const Home = () => {
  return (
    <div id="home">
      <div id="dementia">
        치매진단 기록이 없습니다
        <div id="btn_dt">치매진단 하러 가기</div>
      </div>
      <div id="btns">
        <div className="mainBtn">
          <div className="btn_icon">
            <img src={mainBtn1}></img>
          </div>
          <div className="btn_text">체조</div>
        </div>
        <div className="mainBtn">
          <div className="btn_icon">
            <img src={mainBtn2}></img>
          </div>
          <div className="btn_text">게임</div>
        </div>
        <div className="mainBtn">
          <div className="btn_icon">
            <img src={mainBtn3}></img>
          </div>
          <div className="btn_text">일기</div>
        </div>
        <div className="mainBtn">
          <div className="btn_icon">
            <img src={mainBtn4}></img>
          </div>
          <div className="btn_text">진단</div>
        </div>
        <div className="mainBtn">
          <div className="btn_icon">
            <img src={mainBtn5}></img>
          </div>
          <div className="btn_text">치매진단</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
