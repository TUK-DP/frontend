import React from "react";
import "../styles/diary.css";
import diaryController from "../api/diary.controller";

const DiaryContent = () => {
  const getDiary = () => {
    try {
      const response = diaryController.searchDiary(3, "2024-05-13");
      console.log(response.data);
    } catch (error) {
      console.error("일기 조회 중 오류", error);
    }
  };
  return (
    <div id="diary">
      <div className="text-xl font-bold mt-4">일기 날짜</div>
      <div id="draw">이미지</div>
      <div id="contentBox">
        <div
          style={{
            fontSize: "23px",
            fontWeight: "bold",
            margin: "20px 0",
            textAlign: "left",
            width: "85%",
          }}
        >
          오늘의 일기
        </div>
        <textarea
          id="writeBox"
          className="text-lg"
          placeholder="일기를 작성해주세요."
        />
      </div>
    </div>
  );
};

export default DiaryContent;
