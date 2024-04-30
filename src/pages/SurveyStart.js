import React, { useEffect } from "react";
import Check from "../assets/check.png";
import "../styles/SurveyStart.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";

const SurveyStart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "치매진단" });
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <div id="nameBox">
        <img src={Check} height="95" />
        <p style={{ fontSize: "35px", fontWeight: "bold" }}>치매 자가 진단법</p>
        <p style={{ fontSize: "25px" }}>총 32문항</p>
      </div>
      <p id="txtBox">
        발병 전후의 상태를 잘 아는 본인이 <br /> 치매환자의 인지기능에 대한
        정보를 <br /> 제공함으로써 치매를 조기에 <br /> 발견할 수 있는 치매
        선별검사
      </p>
      <div id="btnSurveyBox">
        <p
          style={{
            fontSize: "15px",
            width: "100%",
            padding: "10px 30px",
            wordBreak: "keep-all",
            textAlign: "center",
          }}
        >
          본 검사는 간단하게 치매여부를 <br />
          평가해 볼 수 있는 간이 도구입니다.
          <br /> 이 결과로 치매를 결정할 수 없으며
          <br /> 반드시 전문의의 평가가 필요합니다.
        </p>
        <div id="btn_survey" onClick={() => navigate("/survey")}>
          치매 진단하기
        </div>
        <div id="btn_before">이전 진단결과</div>
      </div>
    </div>
  );
};

export default SurveyStart;
