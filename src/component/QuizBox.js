import { useEffect } from "react";
import "../styles/QuizBox.css";
const QuizBox = ({ order, isCorrected, userInput, answer }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "85%",
      }}
    >
      <div className="box answer">
        <div>
          {order}
          {answer}
        </div>
        <div style={{ color: isCorrected ? "blue" : "red" }}>
          {isCorrected ? "O" : "X"}
        </div>
      </div>
      <div className="box inputvalue">
        <div className={"w-1/3"}>제출답안 : </div>
        <div className={"w-2/3"}>{userInput}</div>
      </div>
    </div>
  );
};
export default QuizBox;
