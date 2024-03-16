import React, { useCallback, useRef, useState } from "react";
import "../styles/diary.css";
import { useNavigate } from "react-router-dom";
import DiaryController from "../api/diary.controller";
import { useSelector } from "react-redux";
import Loading from "../component/Loading";
//Diary 새롭게 작성
const Diary = () => {
  const navigate = useNavigate();
  const textRef = useRef();
  const { year, month, day } = useSelector((state) => state.DiaryDate);
  const [isSaving, setIsSaving] = useState(false);

  const handleResizeHeight = useCallback(() => {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  const handleContentChange = (e) => {
    // 내용이 변경될 때마다 높이 조정
    handleResizeHeight();
    setDiary({ ...diary, content: e.target.value });
  };

  const dateFormat = () => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 <= 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate())
    );
  };

  const [diary, setDiary] = useState({
    userId: 2,
    title: "string",
    content: "",
    date: dateFormat(),
  });

  const saveDiary = async () => {
    if (diary.content === "") {
      return alert("내용을 작성해주세요.");
    }
    setIsSaving(true);
    await DiaryController.writeDiary(diary);
    console.log("저장됨");
    navigate("/calendar");
  };

  return (
    <div id="diary">
      {isSaving ? <Loading text="일기 저장 중..." /> : null}
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
          {diary.date}
        </div>
        <textarea
          id="writeBox"
          placeholder="일기를 작성해주세요."
          ref={textRef}
          onChange={handleContentChange}
          value={diary.content}
        ></textarea>
      </div>
      <button id="btn_save" onClick={saveDiary} disabled={isSaving}>
        작성완료
      </button>
    </div>
  );
};

export default Diary;
