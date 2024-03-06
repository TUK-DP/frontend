import React from "react";
import "../styles/DiaryEdit.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DiaryEdit = () => {
  const navigate = useNavigate();
  const { year, month, day } = useSelector((state) => state.DiaryDate);

  return (
    <div
      className={
        "flex justify-between items-center py-8 bg-[#e0f4ff] rounded-2xl "
      }
    >
      <button
        className={
          "bg-[#82aae3] text-white w-32 h-10 flex justify-center items-center rounded-full font-bold text-lg mx-2"
        }
        style={{ boxShadow: " 3px 3px 3px rgb(200, 200, 200)" }}
      >
        일기회상
      </button>
      <button
        className={
          "bg-[#82aae3] text-white w-32 h-10 flex justify-center items-center rounded-full font-bold text-lg mx-2"
        }
        style={{ boxShadow: " 3px 3px 3px rgb(200, 200, 200)" }}
      >
        일기보기
      </button>
    </div>
    // <div id="edit">
    //   <div id="btnBox">
    //     <div className="btn" onClick={() => navigate("/diary/test")}>
    //       일기회상
    //     </div>
    //     <div className="btn">일기보기</div>
    //   </div>
    //   <div id="textBox">{`${month}월 ${day}일`}</div>
    //   <div id="painting"></div>
    //   <div id="diaryContent">
    //     <div id="title">제목</div>
    //     <div id="content">일기내용</div>
    //   </div>
    // </div>
  );
};

export default DiaryEdit;
