import React, { useState, useEffect } from "react";
import "../styles/DiaryEdit.css";
import Diary from "../pages/Diary.js";
import { useNavigate } from "react-router-dom";

const DiaryEdit = ({ diaryInfo }) => {
  const [showDiary, setShowDiary] = useState(false);
  const navigate = useNavigate();

  const handleDiaryTestClick = () => {
    // 여기에서 데이터가 있는지 확인하고, 없으면 에러 페이지로 이동
    if (!diaryInfo.result || diaryInfo.result.length === 0) {
      navigate("/error");
      return;
    }

    // 데이터가 있으면 일기회상 페이지로 이동
    navigate("/diary/test", { state: diaryInfo.diaryId });
  };

  const toggleBtn = () => {
    setShowDiary(!showDiary);
  };

  const navigate = useNavigate();
  useEffect(() => {
    setShowDiary(false);
  }, [diaryInfo]);

  return (
    <div>
      <div className={"flex justify-between items-center py-8 bg-[#e0f4ff]  "}>
        <button
          className={
            "bg-[#82aae3] text-white w-40 h-10 flex justify-center items-center rounded-xl font-bold text-lg mx-6"
          }
          style={{ boxShadow: " 3px 3px 3px rgb(200, 200, 200)" }}
          onClick={handleDiaryTestClick}
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
