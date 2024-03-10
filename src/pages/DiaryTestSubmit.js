import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizBox from "../component/QuizBox";

const DiaryTestSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userAnswers, answers } = location.state || {}; // useLocation을 통해 상태값을 가져옴

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
      {userAnswers && answers && userAnswers.length > 0 && answers.length > 0 && (
        // userAnswers와 answers가 존재하고 배열의 길이가 0보다 큰 경우에만 렌더링
        userAnswers.map((value, index) => (
          <QuizBox
            key={index}
            order={`${index + 1}. `}
            answer={answers[index]}
            input={userAnswers[index]}
          />
        ))
      )}
      <div className="bg-[#82aae3] text-white w-[20rem] mx-auto h-[3rem] rounded-lg flex justify-center items-center font-bold text-xl" onClick={()=>navigate('/')}>홈으로가기</div>
    </div>
  );
};
export default DiaryTestSubmit;
