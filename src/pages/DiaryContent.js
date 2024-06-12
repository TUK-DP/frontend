import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/diary.css";
import diaryController from "../api/diary.controller";
import { useLocation } from "react-router-dom";

const DiaryContent = () => {
  const location = useLocation();
  const date = location.state;
  const userInfo = useSelector((state) => state.UserInfo);
  const [diarydata, setData] = useState([]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  const getDiary = async () => {
    try {
      const response = await diaryController.searchDiary({
        userId: userInfo.userId,
        date: date,
      });
      setData(response.data.result[0]);
    } catch (error) {
      console.error("일기 조회 중 오류", error);
    }
  };

  useEffect(() => {
    if (!diarydata.diaryId) {
      getDiary();
    }
  }, [userInfo.userId, diarydata]);

  return (
    <div id="diary">
      <div className="text-xl font-bold mt-5">
        {formatDate(diarydata.createDate)}
      </div>
      {diarydata.imgUrl !== null ? (
        <div id="draw">
          <img
            src={diarydata.imgUrl}
            style={{ width: "100%", height: "100%", borderRadius: "25px" }}
          />
        </div>
      ) : (
        <div className="mb-5"></div>
      )}
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
          value={diarydata.content}
        />
      </div>
    </div>
  );
};

export default DiaryContent;
