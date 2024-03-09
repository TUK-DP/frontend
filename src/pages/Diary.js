import React, { useCallback, useRef, useState } from "react";
import "../styles/diary.css";
import { useNavigate } from "react-router-dom";
import DiaryController from "../api/diary.controller.js";

const Diary = ({ diaryInfo }) => {
  const navigate = useNavigate();
  const textRef = useRef();
  const [isImage, setIsImage] = useState(false);

  const handleResizeHeight = useCallback(() => {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);
  const [content, setContent] = useState(diaryInfo.content);
  const [isSaving, setIsSaving] = useState(false);

  const diaryUpdate = {
    diaryId: diaryInfo.diaryId,
    userId: 2,
    title: diaryInfo.title,
    content: content,
    date: diaryInfo.createDate,
  };

  const handleContentChange = (e) => {
    // 내용이 변경될 때마다 높이 조정
    handleResizeHeight();
    setContent(e.target.value);
  };
  const updateDiary = async () => {
    setIsSaving(true);
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
      <div
        className={
          "flex justify-between items-center py-8 bg-[#e0f4ff]  w-full "
        }
      >
        <button
          className={
            "bg-[#82aae3] text-white w-40 h-10 flex justify-center items-center rounded-xl font-bold text-lg mx-6"
          }
          style={{ boxShadow: " 3px 3px 3px rgb(200, 200, 200)" }}
        >
          삭제
        </button>
        <button
          className={
            "bg-[#82aae3] text-white w-40 h-10 flex justify-center items-center rounded-xl font-bold text-lg mx-6"
          }
          style={{ boxShadow: " 3px 3px 3px rgb(200, 200, 200)" }}
          onClick={updateDiary}
          disabled={isSaving}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default Diary;
