import React, { useCallback, useRef, useState, useEffect } from "react";
import "../styles/diary.css";
import { useNavigate } from "react-router-dom";
import DiaryController from "../api/diary.controller.js";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/Loading.js";
import {
  CHANGE_DIARYID,
  CHANGE_CONTENT,
  CHANGE_DATE,
} from "../redux/modules/DiaryInfo.js";

const Diary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const textRef = useRef();
  const [isImage, setIsImage] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const { userId, diaryId, title, content, date } = useSelector(
    (state) => state.DiaryInfo
  );

  const [newContent, setNewContent] = useState(content);

  const handleResizeHeight = useCallback(() => {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  useEffect(() => {
    handleResizeHeight();
  }, [handleResizeHeight]);

  const handleContentChange = (e) => {
    // 내용이 변경될 때마다 높이 조정
    handleResizeHeight();
    setNewContent(e.target.value);
  };

  // 다이어리 수정
  const updateDiary = async () => {
    try {
      if (newContent == "") {
        return alert("내용을 작성해주세요.");
      }
      setIsSaving(true);
      const res = await DiaryController.updateDiary({
        diaryId: diaryId,
        userId: userId,
        title: title,
        content: newContent,
        date: date,
      });
      const result = res.data.result;
      console.log(result);
      dispatch({ type: CHANGE_DIARYID, diaryId: result.diaryId });
      dispatch({ type: CHANGE_CONTENT, content: result.content });
      setIsSaving(false);
    } catch (error) {
      console.log(error);
    }
  };

  //키워드 가져오기
  const getKeyword = async () => {
    const res = await DiaryController.getQuiz({ diaryId: diaryId });
    console.log(res.data.result);
    setKeywords(res.data.result.map((item) => item.A));
  };

  useEffect(() => {
    getKeyword();
  }, [diaryId]);

  return (
    <div id="diary">
      {isSaving ? <Loading text="일기 수정 중..." /> : null}
      <div id="draw">
        {isImage ? (
          <div></div>
        ) : (
          <div
            id="btn_paint"
            onClick={() => {
              navigate("/draw", { state: keywords });
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
          value={newContent}
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
