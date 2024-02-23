import React from "react";
import { useLocation } from "react-router-dom";
import QuizBox from "../component/QuizBox";

const DiaryTestSubmit = () => {
  const location = useLocation();
  const inputValues = location.state?.inputValues;
  const answers = ["밥", "산", "운동"];

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
      {inputValues.length > 0 &&
        inputValues.map((value, index) => (
          <QuizBox
            key={index}
            order={`${index + 1}. `}
            answer={answers[index]}
            input={`${value}`}
          />
        ))}
    </div>
  );
};
export default DiaryTestSubmit;
