import React from "react";
import "../index.css";
import Right from "../assets/Right.png";
import Left from "../assets/left.png";

const DiaryTest = () => {
  return(
    <div id="test">
      <div id="box"><h2>빈칸에 알맞은 말을 써넣으시오.</h2></div>
      <div id="testBox">
        <div>나는 오늘 _____에 갔다.</div>
      </div>
      <div id="arrow">
        <img src={Left}/>
        <img src={Right}/>
      </div>
      <div id="answerBox">
        <input type="text" placeholder="정답을 입력해주세요." style={{border:0, width:"250px", height:"45px", fontSize:"25px", backgroundColor:"#e0f4ff"}}/>
      </div>
      <div id="btn_submit">제출하기</div>
    </div>
  );
};

export default DiaryTest;