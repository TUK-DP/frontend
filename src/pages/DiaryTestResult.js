import React from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const DiaryTestResult = ({  }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { correctCount, totalCount } = location.state || {};

  const handleChange = () => {
    navigate("/diary/test/result");
  };

  return (
    <div>
      <div className="bg-white rounded-full border-[#e0f4ff] border-4 w-[20rem] h-[20rem] mx-auto flex justify-center items-center text-8xl mt-[3rem] mb-[8rem]">
        <span className="align-baseline">{correctCount} / {totalCount}</span>
      </div>
      <div className="bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg mb-6 flex justify-center items-center font-bold text-xl">결과확인하기</div>
      <div className="bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg flex justify-center items-center font-bold text-xl">홈으로가기</div>
    </div>
  );
};

export default DiaryTestResult;
