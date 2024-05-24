import React, { useEffect } from "react";
import ChartGraph from "../../component/Dementia/ChartGraph";
import { useLocation } from "react-router-dom";
import Button from "../../component/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";

const Surveyresult = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "이전진단결과" });
  }, []);
  const location = useLocation();
  const count = location.state ? location.state.count : 0;

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/survey");
  };
  const backgroundColor = count >= 17 ? "#e15449" : "#5fc25f";

  return (
    <div className="w-full">
      <div className="w-full  flex items-center flex-col">
        <div className="text-3xl h-[7rem] bg-[#e0f4ff] w-full flex justify-center items-center border-b-2">
          내 진단 결과
        </div>
        <div className="bg-white w-[90%] flex items-center justify-center">
          <ChartGraph number={count} />
        </div>
        <div
          className="text-3xl text-white w-full h-16 flex justify-center items-center rounded-ss-lg rounded-tr-lg border-t-2"
          style={{ backgroundColor: backgroundColor }}
        >
          {count >= 17 ? <div>치매 의심</div> : <div>저위험 단계</div>}
        </div>
        <div className="h-[8rem] flex text-2xl justify-center items-center border-b-2 w-full">
          {count >= 17 ? (
            <div>
              치매 정밀 진단을 받아보시기를 <br />
              권장합니다.
            </div>
          ) : (
            <div>
              치매 예방법을 통해 <br /> 치매를 예방하세요.{" "}
            </div>
          )}
        </div>
        <div className="w-full pt-10 pb-8 bg-[#e0f4ff] flex justify-center items-center flex-col">
          <div className="text-xl mb-5">치매 예방법</div>
          <div className="bg-white w-[90%] p-5 rounded-xl border-2 mb-7">
            1. 정기적인 건강검진을 받습니다. <br />
            2. 과도한 음주와 흡연을 피합니다. <br />
            3. 적절한 운동을 합니다. <br />
            4. 균형 잡힌 영양을 섭취합니다. <br />
            5. 활발하게 두뇌를 사용합니다. <br />
            6. 적절한 대인관계와 사회활동을 유지합니다. <br />
            7. 우울증을 치료합니다. <br />
            8. 기억력이 떨어지면 조기에 진료를 받습니다. <br />
          </div>
          <Button
            text="치매진단하러가기"
            width={"90%"}
            height={"60px"}
            fontSize={"24px"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Surveyresult;
