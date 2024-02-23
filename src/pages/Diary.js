import React from "react";
import '../styles/diary.css'
import { useNavigate } from "react-router-dom";

const Diary = () => {
  const navigate = useNavigate();

  function autoResize(event){
    const writeBox = event.target;
    writeBox.style.height = 'auto';
    writeBox.style.height = writeBox.scrollHeight + 'px';
  }

  return(
    <div id="diary">
      <div id="date">2월 22일</div>
      <div id="draw">
        <div id="btn_paint" onClick={() => {navigate("/draw");}}>그림 그리기</div>
      </div>
      <div id="contentBox">
        <div style={{fontSize:"23px", fontWeight:"bold", margin:"20px 0", textAlign:"left", width:"85%"}}>오늘의 일기</div>
        <textarea id="writeBox" placeholder="일기를 작성해주세요." rows={30} onKeyUp={autoResize} onKeyDown={autoResize}></textarea>
      </div>
      <div id="btn_save" onClick={() => {navigate("/calendar");}}>저장</div>
    </div>
  );
};

export default Diary;
