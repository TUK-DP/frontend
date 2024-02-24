import React from 'react';
import Check from '../assets/check.png';

const SurveyStart = () => {
  return (
    <div>
      <div>
        <img src={Check} height="95"/>
        <p>치매 자가 진단법</p>
        <p>총 32문항</p>
      </div>
      <p>발병 전후의 상태를 잘 아는 본인이 치매환자의 인지기능에 대한 정보를 제공함으로써 치매를 초기에 발견할 수 있는 치매 선별검사</p>
      <div>
        <p>본 검사는 자가진단용입니다.</p>
        <p>정확한 진단이 필요하다면 전문의의 도움을 받으세요.</p>
        <div>치매 진단하기</div>
        <div>이전 진단결과</div>
      </div>
    </div>
  );
}

export default SurveyStart;