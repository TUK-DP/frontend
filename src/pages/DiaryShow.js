import React, { useState, useEffect } from "react";
import "../styles/DiaryEdit.css";
import Diary from "../pages/Diary.js";
import { useNavigate } from "react-router-dom";
import DiaryController from "../api/diary.controller.js";


const DiaryEdit = ({ diaryInfo }) => {
  const [showDiary, setShowDiary] = useState(false);
  const fetchData = async () => {
    try {
      const response = await DiaryController.getQuiz({
        diaryId: diaryInfo.diaryId,
      });
      console.log("API 응답:", response.data);
      const { isSuccess, result } = response.data;

      if (result.length === 0) {
        navigate('/error');
      } else {
        navigate("/diary/test", { state: diaryInfo.diaryId });

      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      console.error(error.stack);
    }
  }

  const handleDiaryTestClick = () => {
    fetchData();
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
