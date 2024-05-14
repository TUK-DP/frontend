import React, { useCallback, useRef, useState, useEffect } from "react";
import "../styles/diary.css";
import { useNavigate } from "react-router-dom";
import DiaryController from "../api/diary.controller.js";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/Loading.js";
import { CHANGE_DIARY } from "../redux/modules/DiaryInfo.js";

const Diary = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const textRef = useRef();
  const [isImage, setIsImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { diaryId, content, date, imgUrl } = useSelector(
    (state) => state.DiaryInfo
  );

  const userId = useSelector((state) => state.UserInfo.userId);

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
      console.log(diaryId, userId, newContent);
      const res = await DiaryController.updateDiary(diaryId, {
        userId: userId,
        title: "title",
        content: newContent,
      });

      const diaryInfo = res.data.result;
      console.log(diaryInfo);
      dispatch({
        type: CHANGE_DIARY,
        diaryId: diaryInfo.diaryId,
        content: diaryInfo.content,
        imgUrl: diaryInfo.imgUrl,
        date: diaryInfo.createDate,
      });
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      console.log(error);
    }
  };

  // 다이어리 삭제
  const deleteDiary = async () => {
    try {
      const res = await DiaryController.deleteDiary(diaryId);
      console.log("일기가 삭제되었습니다.");
      // window.location.reload();
      navigate("/");
    } catch (error) {
      setIsSaving(false);
      console.log(error);
    }
  };

  return (
    <div id="diary">
      {isSaving ? <Loading text="일기 수정 중..." /> : null}
      <div id="draw">
        {imgUrl !== null ? (
          <img
            src={imgUrl}
            style={{ width: "100%", height: "100%", borderRadius: "25px" }}
          />
        ) : (
          <div
            id="btn_paint"
            onClick={() => {
              navigate("/draw", { state: data });
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
          onClick={deleteDiary}
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
          수정
        </button>
      </div>
    </div>
  );
};

export default Diary;
