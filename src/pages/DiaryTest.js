import React, { useState, useEffect } from "react";
import "../index.css";
import Right from "../assets/Right.png";
import Left from "../assets/left.png";
import { useNavigate, useLocation } from "react-router-dom";
import DiaryController from "../api/diary.controller.js";

const DiaryTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    // 일기회상 퀴즈 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await DiaryController.getQuiz({
          diaryId: location.state,
        });
        console.log("API 응답:", response.data);
        const { isSuccess, result } = response.data;

        if (!isSuccess || !Array.isArray(result) || result.length === 0) {
          console.log("일기회상 문제를 생성할 수 없음");
        }

        const questions = result.map((item) => item.Q);
        const answers = result.map((item) => item.A);

        setData(questions);
        setAnswers(answers);
        setInputValues(questions.map(() => ""));
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        console.error(error.stack);
      }
    };

    fetchData(); // 함수 호출
  }, []);

  const getNextKeyword = () => {
    if (index === data.length - 1) return;
    setIndex((prevIndex) => prevIndex + 1);
  };

  const getPrevKeyword = () => {
    if (index === 0) return;
    setIndex((prevIndex) => prevIndex - 1);
  };

  const handleInputChange = (e) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleSubmission = async () => {
    try {
      // 입력한 값과 서버에서 받은 정답을 비교하여 일치하는 개수 계산
      let newCorrectCount = 0;
      inputValues.forEach((value, i) => {
        if (value === answers[i]) {
          newCorrectCount++;
        }
      });

      // 계산된 정답 개수를 저장
      setCorrectCount(newCorrectCount);

      // 결과 페이지로 이동
      navigate("/diary/test/result", {
        state: {
          correctCount: newCorrectCount,
          totalCount: inputValues.length,
          answers: answers, // 정답 배열 전달
          userAnswers: inputValues, // 사용자 입력 배열 전달
        },
      });
    } catch (error) {
      console.error("Error handling submission:", error);
      // 오류 처리
    }
  };

  return (
    <div id="test">
      <div id="box" className="relative">
        <h2 className={"text-2xl font-semibold"}>
          빈칸에 알맞은 말을 써넣으시오.
        </h2>
        <div
          id="arrow"
          className={"absolute top-[600px] flex w-full justify-between px-8"}
        >
          {index === 0 ? (
            <div></div>
          ) : (
            <img src={Left} onClick={getPrevKeyword} />
          )}
          {index === data.length - 1 ? (
            <div></div>
          ) : (
            <img src={Right} onClick={getNextKeyword} />
          )}
        </div>
      </div>
      {data.length > 0 && (
        <div>
          <div id="testBox">{data[index]}</div>
          <div id="answerBox">
            <input
              type="text"
              placeholder="정답을 입력해주세요."
              style={{
                border: 0,
                width: "250px",
                height: "45px",
                fontSize: "25px",
                backgroundColor: "#e0f4ff",
                textAlign: "center",
              }}
              value={inputValues[index]}
              onChange={handleInputChange}
            />
          </div>
          {index === data.length - 1 && (
            <div id="btn_submit" onClick={handleSubmission}>
              제출하기
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiaryTest;
