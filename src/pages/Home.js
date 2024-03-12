import React from "react";
import "../index.css";
import mainBtn1 from "../assets/mainBtn1.png";
import mainBtn2 from "../assets/mainBtn2.png";
import mainBtn3 from "../assets/mainBtn3.png";
import mainBtn4 from "../assets/mainBtn4.png";
import mainBtn5 from "../assets/mainBtn5.png";
import user from "../assets/user.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        치매진단 기록이 없습니다
        <div onClick={()=>{navigate("/surveyStart")}}>치매진단 하러 가기</div>
      </div>
      <div>
        <div>
          <div>
            <img src={mainBtn1}></img>
          </div>
          <div>체조</div>
        </div>
        <div
          onClick={() => {
            navigate("/games");
          }}
        >
          <div>
            <img src={mainBtn2}></img>
          </div>
          <div>게임</div>
        </div>

        <div onClick={() => {navigate("/calendar");}}>
          <div>
            <img src={mainBtn3}></img>
          </div>
          <div>일기</div>
        </div>
        <div>
          <div onClick={() => {
            navigate("/surveyStart");
          }}>
            <img src={mainBtn4}></img>
          </div>
          <div>진단</div>
        </div>
        <div>
          <div>
            <img src={mainBtn5}></img>
          </div>
          <div>치매센터</div>
        </div>
        <div onClick={() => navigate("/login")}>
          <div>
            <img src={user}></img>
          </div>
          <div>마이페이지</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
