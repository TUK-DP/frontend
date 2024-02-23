import React, { useState } from "react";
import "../index.css";
import Right from "../assets/Right.png";
import Left from "../assets/left.png";
import { useNavigate } from "react-router-dom";

const DiaryTest = () => {
  const navigate = useNavigate();
  const data = [
    "___을 먹었는데 맛있었다dddddddddddddddddddddddddddddddd.",
    "나는 오늘 ___에 갔다.",
    "나는 어제 ___를 했다.",
  ];
  const [index, setIndex] = useState(0);
  const [inputValues, setInputValues] = useState(data.map(() => ""));

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
    console.log("저장된 값:", inputValues);
    navigate("/diary/test/submit", { state: { inputValues } });
  };

  return (
    <div id="test">
      <div id="box">
        <h2>빈칸에 알맞은 말을 써넣으시오.</h2>
      </div>
      {data.length > 0 && (
        <div>
          <div id="testBox">{data[index]}</div>
          <div id="arrow" style={{ padding: "0px 20px" }}>
            <img src={Left} onClick={getPrevKeyword} />
            <img src={Right} onClick={getNextKeyword} />
          </div>

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
