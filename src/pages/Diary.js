import React, { useCallback, useRef, useState, useEffect } from "react";
import "../styles/diary.css";
import { useNavigate } from "react-router-dom";
import DiaryController from "../api/diary.controller.js";

const Diary = ({ diaryInfo }) => {
  const navigate = useNavigate();
  const textRef = useRef();
  const [isImage, setIsImage] = useState(false);
  const [keywords, setKeywords] = useState([]);
  //diary에는 diaryId, title, createDate, content가 저장됨
  const [diary, setDiary] = useState({
    diaryId: diaryInfo.diaryId,
    title: diaryInfo.title, //안변함
    date: diaryInfo.createDate, //안변함
    content: diaryInfo.content,
  });
  const [content, setContent] = useState(diary.content);
  const [isSaving, setIsSaving] = useState(false);

  const handleResizeHeight = useCallback(() => {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  useEffect(() => {
    handleResizeHeight();
  }, [handleResizeHeight]);

  const [diaryUpdate, setDiaryUpdate] = useState({
    diaryId: diary.diaryId,
    userId: 2, //안변함
    title: diary.title, //안변함
    content: content,
    date: diary.date, //안변함
  });

  const handleContentChange = (e) => {
    // 내용이 변경될 때마다 높이 조정
    handleResizeHeight();
    setContent(e.target.value);
  };
  //content의 최신값 반영
  useEffect(() => {
    setDiaryUpdate({ ...diaryUpdate, content: content });
  }, [content]);
  //다이어리 수정
  const updateDiary = async () => {
    setIsSaving(true);
    try {
      const res = await DiaryController.updateDiary(diaryUpdate);
      const result = res.data.result;
      setDiary({ ...diary, diaryId: result.diaryId, content: result.content });
      setDiaryUpdate({
        ...diaryUpdate,
        diaryId: result.diaryId,
        content: result.content,
      });
      setIsSaving(false);
    } catch (error) {
      console.log(error);
    }
  };

  //키워드 가져오기
  const getKeyword = async () => {
    const res = await DiaryController.getQuiz({ diaryId: diary.diaryId });
    console.log(res.data.result);
    setKeywords(res.data.result.map((item) => item.A));
  };

  useEffect(() => {
    getKeyword();
  }, [diary]);

  return (
    <div id="diary">
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
