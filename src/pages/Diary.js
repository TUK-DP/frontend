import React, { useCallback, useRef, useState, useEffect } from "react";
import "../styles/diary.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DiaryController from "../api/diary.controller.js";

const Diary = ({ diaryInfo }) => {
  const navigate = useNavigate();
  const textRef = useRef();
  const [isImage, setIsImage] = useState(false);
  const { year, month, day } = useSelector((state) => state.DiaryDate);
  const handleResizeHeight = useCallback(() => {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  const [content, setContent] = useState(diaryInfo.title);

  const diaryUpdate = {
    diaryId: diaryInfo.id,
    userId: diaryInfo.user.id,
    title: diaryInfo.title,
    content: content,
    date: diaryInfo.writedate,
  };

  const handleContentChange = (e) => {
    // 내용이 변경될 때마다 높이 조정
    handleResizeHeight();
    setContent(e.target.value);
  };
  const updateDiary = async () => {
    try {
      await DiaryController.updateDiary(diaryUpdate);
      console.log(diaryUpdate.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="diary">
      <div id="draw">
        {isImage ? (
          <div></div>
        ) : (
          <div
            id="btn_paint"
            onClick={() => {
              navigate("/draw");
            }}
          >
            그림 그리기
          </div>
        )}
      </div>
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
          placeholder="일기를 작성해주세요."
          ref={textRef}
          onChange={handleContentChange}
          value={content}
        />
      </div>
      <div id="btn_save" onClick={updateDiary}>
        저장
      </div>
    </div>
  );
};

export default Diary;
