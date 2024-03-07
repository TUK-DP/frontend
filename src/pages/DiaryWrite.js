import React, { useCallback, useRef, useState } from "react";
import "../styles/diary.css";
import { useNavigate } from "react-router-dom";
import DiaryController from "../api/diary.controller";
import { useSelector } from "react-redux";
//Diary 새롭게 작성
const Diary = () => {
  const navigate = useNavigate();
  const textRef = useRef();
  const { year, month, day } = useSelector((state) => state.DiaryDate);

  const handleResizeHeight = useCallback(() => {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  const handleContentChange = (e) => {
    // 내용이 변경될 때마다 높이 조정
    handleResizeHeight();
    setDiary({ ...diary, content: e.target.value });
    console.log(diary);
  };

  const [diary, setDiary] = useState({
    userId: 2,
    title: "string",
    content: "",
    date: `${year}-${month}-${day}`,
    // date: "2024-03-05",
  });

  const saveDiary = async () => {
    await DiaryController.writeDiary(diary);
    navigate("/calendar");
  };
  return (
    <div id="diary">
      <div id="contentBox" className={"mt-10"}>
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
          value={diary.content}
        ></textarea>
      </div>
      <div id="btn_save" onClick={saveDiary}>
        작성완료
      </div>
    </div>
  );
};

export default Diary;