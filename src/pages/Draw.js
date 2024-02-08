import Canvas from "../component/ImageDiary/Canvas";
import React, { useRef, useState } from "react";
import Right from "../assets/Right.png";
import Left from "../assets/Left.png";
import Palette from "../component/ImageDiary/Palette";
import { connect } from "react-redux";
import { brushSize } from "../redux/modules/ImageDiary";

const Draw = ({ lineWidth, dispatch }) => {
  //추출된 키워드
  const data = ["바다", "가족", "여행", "과일", "강아지"];
  const [index, setIndex] = useState(0);

  //다음 키워드 제시
  const getNextKeyword = () => {
    if (index == data.length - 1) return;
    setIndex((index) => index + 1);
  };
  //이전 키워드 제시
  const getPrevKeyword = () => {
    if (index == 0) return;
    setIndex((index) => index - 1);
  };
  //브러쉬 크기 변경
  const changeLineWidth = (event) => {
    const newLineWidth = parseInt(event.target.value, 10);
    dispatch(brushSize(newLineWidth));
  };

  const canvasRefs = useRef(data.map(() => React.createRef()));

  return (
    <div>
      {/* 키워드 */}
      <div style={{ display: "flex" }}>
        <img src={Left} height="30" onClick={getPrevKeyword} />
        <p style={{ fontSize: "25px", flexGrow: "1", textAlign: "center" }}>
          {data[index]}
        </p>
        <img src={Right} height="30" onClick={getNextKeyword} />
      </div>
      {/* 색상팔레트 */}
      <Palette />
      {/* 브러쉬 크기 조정 */}
      <div style={{ fontSize: "20px", margin: "10px" }}>
        브러쉬 크기 {lineWidth}
        <input
          type="range"
          value={lineWidth}
          min="1"
          max="20"
          step="1"
          onChange={changeLineWidth}
        />
      </div>
      {/* Canvas */}
      <div>
        {data.map((keyword, i) => (
          <Canvas
            key={i}
            isVisible={i == index}
            canvasRef={canvasRefs.current[i]}
          />
        ))}
        {data.length - 1 === index ? <button>종료</button> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lineWidth: state.ImageDiary.lineWidth,
});

export default connect(mapStateToProps)(Draw);
