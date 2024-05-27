import React, { useState, useEffect } from "react";
import "../../styles/DiaryEdit.css";
import Diary from "./Diary.js";
import { useNavigate } from "react-router-dom";
import DiaryController from "../../api/diary.controller.js";
import { useSelector } from "react-redux";
import keywordController from "../../api/keyword.controller.js";

const DiaryEdit = () => {
  const [showDiary, setShowDiary] = useState(false);

  const userId = useSelector((state) => state.UserInfo.userId);
  const { diaryId, title, content, date } = useSelector(
    (state) => state.DiaryInfo
  );

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await DiaryController.getQuiz({
        diaryId: diaryId,
      });
      console.log("API 응답:", response.data);
      const { isSuccess, result } = response.data;

      if (result.length === 0) {
        navigate("/error");
      } else {
        navigate("/diary/test");
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      console.error(error.stack);
    }
  };

  const handleDiaryTestClick = () => {
    fetchData();
  };

  const toggleBtn = () => {
    setShowDiary(!showDiary);
  };

  const navigate = useNavigate();
  useEffect(() => {
    setShowDiary(false);
  }, [diaryId]);

  const getKeyword = async () => {
    try {
      const response = await keywordController.getKeyword(diaryId);
      const { isSuccess, result } = response.data;

      if (result.length == 0) {
        return;
      }
      setData(
        result.map((item, index) => {
          return { keywordId: item.keywordId, keyword: item.keyword };
        })
      );
      console.log(result);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      console.error(error.stack);
    }
  };
  return (
    <div>
      <div className={"flex justify-between items-center py-8 bg-[#e0f4ff]  "}>
        <button
          className={
            "bg-[#82aae3] text-white w-40 h-10 flex justify-center items-center rounded-xl font-bold mx-6"
          }
          style={{ boxShadow: " 3px 3px 3px rgb(200, 200, 200)" }}
          onClick={handleDiaryTestClick}
        >
          일기회상
        </button>
        <button
          className={
            "bg-[#82aae3] text-white w-40 h-10 flex justify-center items-center rounded-xl font-bold mx-6"
          }
          style={{
            boxShadow: " 3px 3px 3px rgb(200, 200, 200)",
            display: showDiary ? "none" : "block",
          }}
          onClick={() => {
            toggleBtn();
            getKeyword();
          }}
        >
          일기열기
        </button>
        <button
          className={
            "bg-[#82aae3] text-white w-40 h-10 flex justify-center items-center rounded-xl font-bold mx-6"
          }
          style={{
            boxShadow: " 3px 3px 3px rgb(200, 200, 200)",
            display: showDiary ? "block" : "none",
          }}
          onClick={toggleBtn}
        >
          일기닫기
        </button>
      </div>
      {showDiary && <Diary data={data} />}
    </div>
  );
};

export default DiaryEdit;
