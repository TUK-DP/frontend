import React from "react";
import { useLocation } from 'react-router-dom';


const DiaryTestResult = ({  }) => {
  const location=useLocation();
  const { correctCount, totalCount } = location.state;

  return (
    <div>
      <div>
        <div>총 문제 : {totalCount}</div>
        <div>맞은 문제 : {correctCount}</div>
      </div>
      <div className="bg-[]">결과확인하기</div>
      <div>홈으로가기</div>
    </div>
  );
};

export default DiaryTestResult;
