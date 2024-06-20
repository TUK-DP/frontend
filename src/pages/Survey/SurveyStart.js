import React, { useState, useEffect } from "react";
import Check from "../../assets/check.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";
import recordController from "../../api/record.controller";

const SurveyStart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "치매진단" });
    getRecord();
  }, []);
  const navigate = useNavigate();

  const [record, setRecord] = useState({});
  const userId = useSelector((state) => state.UserInfo.userId);

  const getRecord = async () => {
    try {
      const response = await recordController.prevRecord({ userId });
      const { isSuccess, message, result } = response.data;
      setRecord(result.yesCount);
    } catch (error) {
      console.log("이전 진단결과 조회 중 오류", error);
    }
  };

  const handleSubmit = () => {
    if (record != null) {
      navigate("/prevsurveyresult", { state: { count: record } });
    } else {
      navigate("/surveyerror");
    }
  };

  return (
    <div>
      <div className="bg-[#e0f4ff] flex flex-col justify-center items-center mb-10 h-[13rem]">
        <img src={Check} height="95" />
        <p className="font-bold text-4xl">치매 자가 진단법</p>
        <p className="text-2xl">총 32문항</p>
      </div>
      <p className="text-2xl text-center break-keep">
        발병 전후의 상태를 잘 아는 본인이 치매환자의 인지기능에 대한 정보를
        제공함으로써 치매를 조기에 발견할 수 있는 치매 선별검사
      </p>
      <div className="flex flex-col justify-center items-center w-[95%] h-auto rounded-2xl border-4 my-8 mx-auto">
        <p className="text-xl w-full py-5 px-10 break-keep text-center">
          본 검사는 간단하게 치매여부를 평가해 볼 수 있는 간이 도구입니다. 이
          결과로 치매를 결정할 수 없으며 반드시 전문의의 평가가 필요합니다.
        </p>
        <div
          className="w-[90%] h-auto bg-[#e0f4ff] text-2xl rounded-xl border-4 flex justify-center items-center font-bold py-3"
          onClick={() => navigate("/survey")}
        >
          치매 진단하기
        </div>
        <div
          className="w-[90%] h-auto text-2xl flex justify-center items-center my-3"
          onClick={handleSubmit}
        >
          이전 진단결과
        </div>
      </div>
    </div>
  );
};

export default SurveyStart;
