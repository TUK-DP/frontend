import React, { useState,useEffect } from "react";
import "../index.css";
import Right from "../assets/Right.png";
import Left from "../assets/left.png";
import { useNavigate } from "react-router-dom";

const DiaryTest = () => {
  const navigate = useNavigate();
  const data = [
    "___을 먹었는데 맛있었다.",
    "나는 오늘 ___에 갔다. 문장이 길어지면 어떻게 되는지 궁금해서 적어봤습니다람쥐",
    "나는 어제 ___를 했다.",
  ];
  const answers = ["밥", "산", "운동"];
  const [index, setIndex] = useState(0);
  const [inputValues, setInputValues] = useState(data.map(() => ""));
  const [correctCount, setCorrectCount] = useState(0);

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

  const handleSubmission = () => {
    // 입력한 값과 정답을 비교하여 일치하는 개수 계산
    const newCorrectCount = inputValues.reduce(
      (count, value, i) => (value === answers[i] ? count + 1 : count),
      0
    );
    setCorrectCount(newCorrectCount);

    // 결과 페이지로 이동
    navigate("/diary/test/result", {
      state: { correctCount: newCorrectCount, totalCount: data.length },
    });
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
