import React from 'react';
import Check from '../assets/check.png';
import '../styles/Survey.css';

const SurveyStart = () => {
  return (
    <div>
      <div id='nameBox'>
        <img src={Check} height="95"/>
        <p style={{fontSize:"35px", fontWeight:"bold"}}>치매 자가 진단법</p>
        <p style={{fontSize:"25px"}}>총 32문항</p>
      </div>
      <p id='txtBox'>발병 전후의 상태를 잘 아는 본인이 <br/> 치매환자의 인지기능에 대한 정보를 <br/> 제공함으로써 치매를 조기에 <br/> 발견할 수 있는 치매 선별검사</p>
      <div id='btnSurveyBox'>
        <p style={{fontSize:"15px"}}>본 검사는 자가진단용입니다. <br/> 정확한 진단이 필요하다면 전문의의 도움을 받으세요.</p>
        <div id='btn_survey'>치매 진단하기</div>
        <div id='btn_before'>이전 진단결과</div>
      </div>
    </div>
  );
}

export default SurveyStart;