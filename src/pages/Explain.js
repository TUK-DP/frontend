import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const Explain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div className="bg-[#e0f4ff] w-full h-auto pb-10 mx-auto flex flex-col  items-center mb-[2rem] text-[#82aae3]">
        <span className="text-2xl font-bold mt-[2rem] mb-[1rem] px-3">키워드 그래프 설명</span>
        <div className="text-[#828282] rounded-[3rem] flex flex-col bg-white w-[90%] h-auto font-extrabold text-lg items-center">
          <div className='my-4'>색깔마다 의미해요!</div>
          <div className='flex justify-between w-full px-2'>
            <div className='bg-[#FFDFDF] w-[4rem] h-[4rem] rounded-full flex justify-center items-center'>나</div>
            <div className='bg-[#FFE3BB] w-[4rem] h-[4rem] rounded-full flex justify-center items-center'>일기</div>
            <div className='bg-[#D2E0FB] w-[4rem] h-[4rem] rounded-full flex justify-center items-center'>키워드</div>
          </div>
          <div className='my-5 flex items-center'>
            <div className='bg-[#D2E0FB] w-[5rem] h-[5rem] rounded-full flex justify-center items-center mr-2'>키워드<br/>(숫자)</div>
            <div>숫자는 키워드의 가중치를 나타내요!</div>
          </div>
          <div className='flex items-center mb-4'>
          <div className='bg-[#D2E0FB] w-[4rem] h-[4rem] rounded-full flex justify-center items-center'>키워드</div>
          <div>--(숫자)--</div>
          <div className='bg-[#D2E0FB] w-[4rem] h-[4rem] rounded-full flex justify-center items-center'>키워드</div>
          </div>
          <div className='mb-3'>키워드 사이 숫자는 관계값을 나타내요!</div>
        </div>
      </div>
      <div className="mb-5 bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg flex justify-center items-center font-bold text-xl" onClick={()=>navigate('/keyword',{state:{diaryId: location.state.diaryId}})}>키워드 그래프 보기</div>
      <div className="mb-5 bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg flex justify-center items-center font-bold text-xl" onClick={()=>navigate('/')}>홈으로 가기</div>
    </div>
  );
};

export default Explain;