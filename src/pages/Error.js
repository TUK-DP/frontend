import React from 'react';
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-2);
  };
  return (
    <div>
      <div className="bg-[#e0f4ff] w-full h-[23rem] mx-auto flex flex-col  items-center mt-[3rem] mb-[5rem] text-[#82aae3]">
        <span className="text-2xl font-bold mt-[3rem] mb-[1rem] px-3">회상 문제를 생성할 수 없습니다.</span>
        <span className='mb-[1rem] font-bold'>생성할 수 없는 경우는 아래와 같습니다.</span>
        <div className="text-[#828282] rounded-[3rem] flex flex-col justify-evenly items-center bg-white w-[22rem] h-[12rem] font-extrabold text-lg">
          <span>일기 내용 또는 문장이 너무 짧아요!</span>
          <span>일기에 영어가 많이 포함되어있어요!</span>
        </div>
      </div>
      <div className="bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg mb-6 flex justify-center items-center font-bold text-xl" onClick={goBack}>일기수정하기</div>
      <div className="bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg flex justify-center items-center font-bold text-xl" onClick={()=>navigate('/')}>홈으로가기</div>
    </div>
  );
};

export default Error;