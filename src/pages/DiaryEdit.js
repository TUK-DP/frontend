import React from "react";
import "../styles/DiaryEdit.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DiaryEdit = () => {
  const navigate = useNavigate();
  const { year, month, day } = useSelector((state) => state.DiaryDate);

  return (
    <div id="edit">
      <div id="btnBox">
        <div className="btn" onClick={() => navigate("/diary/test")}>
          일기회상
        </div>
        <div className="btn" onClick={() => navigate("/diarywrite")}>
          일기수정
        </div>
      </div>
      <div id="textBox">{`${month}월 ${day}일`}</div>
      <div id="painting"></div>
      <div id="diaryContent">
        <div id="title">제목</div>
        <div id="content">
          일기내용dddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        </div>
      </div>
    </div>
  );
};

export default DiaryEdit;
