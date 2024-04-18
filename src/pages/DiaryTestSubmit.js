import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizBox from "../component/QuizBox";

const DiaryTestSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answerList = location.state || {}; // useLocation을 통해 상태값을 가져옴

  useEffect(() => {
    console.log(answerList);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "30px",
        flexDirection: "column",
      }}
    >
      {answerList.map((item, index) => (
        <QuizBox
          key={index}
          order={`${index + 1}. `}
          isCorrected={item.isCorrected}
          userInput={item.userInput}
          answer={item.answer}
        />
      ))}
      <div
        className="bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg flex justify-center items-center font-bold text-xl mb-8"
        onClick={() => navigate("/")}
      >
        홈으로가기
      </div>
    </div>
  );
};
export default DiaryTestSubmit;
