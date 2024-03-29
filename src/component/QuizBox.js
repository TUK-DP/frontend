import "../styles/QuizBox.css";
const QuizBox = ({ order, answer, input }) => {
  const isCorrect = answer == input;
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
        <div style={{ color: isCorrect ? "blue" : "red" }}>
          {isCorrect ? "O" : "X"}
        </div>
      </div>
      <div className="box inputvalue">
        <div className={"w-1/3"}>제출답안 : </div>
        <div className={"w-2/3"}>{input}</div>
      </div>
    </div>
  );
};
export default QuizBox;
