import React, { useState, useEffect } from "react";
import "../index.css";
import Right from "../assets/Right.png";
import Left from "../assets/left.png";
import { useNavigate, useLocation } from "react-router-dom";
import DiaryController from "../api/diary.controller.js";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName.js";
const DiaryTest = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "일기회상" });
  }, []);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const diaryId = useSelector((state) => state.DiaryInfo.diaryId);

  useEffect(() => {
    // 일기회상 퀴즈 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await DiaryController.getQuiz({
          diaryId: diaryId,
        });
        console.log("API 응답:", response.data);
        const { isSuccess, result } = response.data;

        if (!isSuccess || !Array.isArray(result) || result.length === 0) {
          console.log("일기회상 문제를 생성할 수 없음");
        }

        const questions = result.map((item) => ({
          question: item.question,
          keywordId: item.keywordId,
        }));

        setData(questions);
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
    const quizData = data.map((item, index) => ({
      keywordId: item.keywordId,
      answer: inputValues[index],
    }));
    try {
      const res = await DiaryController.checkAnswer({ answers: quizData });
      console.log(res.data.result);
      navigate("/diary/test/result", {
        state: {
          result: res.data.result,
          diaryId: diaryId
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="test">
      <div id="box" className="relative">
        <h2
          className={
            "text-2xl font-semibold h-[8rem] flex justify-center items-center"
          }
        >
          빈칸에 알맞은 말을 써넣으시오.
        </h2>
      </div>
      <div id="arrow" className={"flex w-full justify-between px-8 mb-[2rem]"}>
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
      {data.length > 0 && (
        <div>
          <div id="testBox">{data[index].question}</div>
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
