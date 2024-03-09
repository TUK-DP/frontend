import React, { useState } from "react";
import "../styles/DiaryEdit.css";
import Diary from "../pages/Diary.js";
import { useNavigate } from "react-router-dom";

const DiaryEdit = ({ diaryInfo }) => {
  //true -> 일기열기, false -> 일기닫기
  const [showDiary, setShowDiary] = useState(false);
  const toggleBtn = () => {
    setShowDiary(!showDiary);
  };
  const navigate = useNavigate();
  return (
    <div>
      <div className={"flex justify-between items-center py-8 bg-[#e0f4ff]  "}>
        <button
          className={
            "bg-[#82aae3] text-white w-40 h-10 flex justify-center items-center rounded-xl font-bold text-lg mx-6"
          }
          style={{ boxShadow: " 3px 3px 3px rgb(200, 200, 200)" }}
          onClick={() => navigate("/diary/test")}
        >
          일기회상
        </button>
        <button
          className={
            "bg-[#82aae3] text-white w-40 h-10 flex justify-center items-center rounded-xl font-bold text-lg mx-6"
          }
          style={{ boxShadow: " 3px 3px 3px rgb(200, 200, 200)" }}
          onClick={toggleBtn}
        >
          {showDiary ? "일기닫기" : "일기열기"}
        </button>
      </div>
      {showDiary && <Diary diaryInfo={diaryInfo} />}
    </div>
  );
};

export default DiaryEdit;
