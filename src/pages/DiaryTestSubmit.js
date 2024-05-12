import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizBox from "../component/QuizBox";
import Button from "../component/Button";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";

const DiaryTestSubmit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "일기회상 결과" });
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const answerList = location.state.list || {}; // useLocation을 통해 상태값을 가져옴

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
      <div className={"pb-5 w-full h-[155px] flex flex-col justify-between items-center"}>
        <Button
          width="90%"
          height="60px"
          text="키워드 그래프 보기"
          onClick={() => navigate("/explain",{state:{diaryId: location.state.diaryId}})}
          fontSize="20px"
        />
        <Button
          width="90%"
          height="60px"
          text="홈으로 가기"
          onClick={() => navigate("/")}
          fontSize="20px"
        />
      </div>
    </div>
  );
};
export default DiaryTestSubmit;
