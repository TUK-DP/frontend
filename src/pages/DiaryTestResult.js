import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DiaryTestResult = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuestionSize, score, answerList } =
    location.state.result[0] || {};

  const handleResultCheck = () => {
    navigate("/diary/test/submit", {
      state: answerList,
    });
  };

  return (
    <div>
      <div className="bg-[#e0f4ff] w-full h-[23rem] mx-auto flex flex-col  items-center mt-[3rem] mb-[5rem] text-[#82aae3]">
        <span className="text-3xl font-bold mt-[3rem] mb-[2rem]">
          일기회상 점수는
        </span>
        <span className="rounded-[3rem] flex justify-center items-center bg-white w-[20rem] h-[12rem] font-extrabold text-8xl">
          {score} / {totalQuestionSize}
        </span>
      </div>
      <div
        className="bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg mb-6 flex justify-center items-center font-bold text-xl"
        onClick={handleResultCheck}
      >
        결과확인하기
      </div>
      <div
        className="bg-[#82aae3] mb-5 text-white w-[20rem] mx-auto h-[3rem] rounded-lg flex justify-center items-center font-bold text-xl"
        onClick={() => navigate("/calendar")}
      >
        캘린더로가기
      </div>
    </div>
  );
};

export default DiaryTestResult;
