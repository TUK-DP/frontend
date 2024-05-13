import { useEffect } from "react";
import "../styles/QuizBox.css";
const QuizBox = ({ order, isCorrected, userInput, answer }) => {
      return (
        <div className={"flex-col w-[85%]"}>
            <div className="box answer">{order}{answer}
                <span style={{color: isCorrected ? "blue" : "red"}}>{isCorrected ? "O" : "X"}</span>
            </div>
            <div className="box inputvalue flex-col">제출답안 : {userInput}</div>
        </div>
    );
};
export default QuizBox;
