import React from 'react';
import { useNavigate } from "react-router-dom";

const Explain = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-[#e0f4ff] w-full h-[23rem] mx-auto flex flex-col  items-center mt-[3rem] mb-[5rem] text-[#82aae3]">
        <span className="text-2xl font-bold mt-[3rem] mb-[1rem] px-3">키워드 그래프 설명</span>
        <div className="text-[#828282] rounded-[3rem] flex flex-col justify-evenly items-center bg-white w-[22rem] h-[12rem] font-extrabold text-lg">
          <span></span>
        </div>
      </div>
      <div className="bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg flex justify-center items-center font-bold text-xl" onClick={()=>navigate('/keyword')}>키워드 그래프 보기</div>
    </div>
  );
};

export default Explain;