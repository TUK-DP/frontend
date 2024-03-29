import Trash from "../../assets/ImageDiary/Trash.png";
import Back from "../../assets/ImageDiary/Back.png";
import Brush from "../../assets/ImageDiary/Brush.png";
import Eraser from "../../assets/ImageDiary/Eraser.png";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

const Canvas = ({ lineWidth, selectedColor, isVisible, canvasRef }) => {
  const [getCtx, setGetCtx] = useState(null); //드로잉 영역
  const [painting, setPainting] = useState(false); //그리기 모드
  const [erasing, setErasing] = useState(false); //지우기 모드
  const [history, setHistory] = useState([]); //실행 취소

  //드로잉 영역 초기 세팅
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineJoin = "round"; //선이 꺽이는 부분의 스타일
    ctx.fillStyle = "white"; //캔버스 배경색
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3; //선의 두께
    ctx.strokeStyle = "#000000"; //선의 색

    setGetCtx(ctx);
    clearCanvas();
  }, []);

  //브러쉬 크기, 펜 색상 변경 시 호출됨
  useEffect(() => {
    if (getCtx) {
      getCtx.lineWidth = lineWidth;
      getCtx.strokeStyle = selectedColor;
    }
  }, [lineWidth, selectedColor]);

  //그리기, 지우기 기능
  const drawFn = (x, y) => {
    if (!painting) {
      getCtx.beginPath();
      getCtx.moveTo(x, y);
    } else {
      if (erasing) {
        getCtx.clearRect(x, y, lineWidth * 2, lineWidth * 2);
      } else {
        getCtx.lineTo(x, y);
        getCtx.stroke();
      }
    }
  };

  //canvas 화면 전체 지우기
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // 캔버스 상태를 히스토리에 업데이트하는 함수
  const updateCanvasState = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prevHistory) => [...prevHistory, currentState]);
  };

  //실행 취소
  const unDo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (history.length > 1) {
      history.pop(); // 현재 상태 제거
      const prevState = history[history.length - 1];
      ctx.putImageData(prevState, 0, 0);
    } else {
      history.pop();
      clearCanvas();
    }
  };

  // 터치 이벤트 핸들러 함수
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left + window.scrollX;
    const y = touch.clientY - rect.top + window.scrollY;
    setPainting(true);
    drawFn(x, y);
    updateCanvasState();
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left + window.scrollX;
    const y = touch.clientY - rect.top + window.scrollY;
    drawFn(x, y);
  };

  const handleTouchEnd = () => {
    setPainting(false);
  };

  return (
    <div
      style={{
        display: isVisible ? "block" : "none",
      }}
    >
      {/* 전체삭제, 뒤로가기, 브러쉬, 지우개 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "10px 0px 15px 0px",
        }}
      >
        <img src={Trash} onClick={clearCanvas} />
        <img src={Back} onClick={unDo} />
        <div
          style={{
            backgroundColor: `${selectedColor}`,
            width: "100px",
            borderRadius: "20px",
          }}
        ></div>
        <img src={Brush} onClick={() => setErasing(false)} />
        <img src={Eraser} onClick={() => setErasing(true)} />
      </div>
      <canvas
        ref={canvasRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        width="350"
        height="350"
        style={{
          border: "4px solid #D9D9D9",
          borderRadius: "40px",
        }}
      ></canvas>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lineWidth: state.ImageDiary.lineWidth,
  selectedColor: state.ImageDiary.selectedColor,
});

export default connect(mapStateToProps)(Canvas);
