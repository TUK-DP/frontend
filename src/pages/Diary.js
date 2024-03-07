import React, { useCallback, useRef, useState } from "react";
import "../styles/diary.css";
import { useNavigate } from "react-router-dom";

const Diary = () => {
  const navigate = useNavigate();
  const textRef = useRef();
  const [isImage, setIsImage] = useState(false);

  const handleResizeHeight = useCallback(() => {
    const textarea = textRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  const handleContentChange = () => {
    // 내용이 변경될 때마다 높이 조정
    handleResizeHeight();
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
        ></textarea>
      </div>
      <div id="btn_save">저장</div>
    </div>
  );
};

export default Diary;
