import React from "react";
import '../styles/DiaryEdit.css';
import { useNavigate } from "react-router-dom";

const DiaryEdit = () => {
  const navigate = useNavigate();
  return(
    <div id="edit">
      <div id="btnBox">
        <div className="btn">일기회상</div>
        <div className="btn">일기수정</div>
      </div>
      <div id="textBox">오늘의 일기</div>
      <div id="painting"></div>
      <div id="diaryContent"></div>
    </div>
  );
};

export default DiaryEdit;