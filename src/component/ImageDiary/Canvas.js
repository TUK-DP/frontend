import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineRollback } from "react-icons/ai";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { TfiEraser } from "react-icons/tfi";
import { useEffect, useRef, useState } from "react";
import { imageState } from "../../recoil/keywordState";
import { useRecoilState, useRecoilValue } from "recoil";
import { brushSizeState, selectedColorState } from "../../recoil/canvasState";

const INPUT_START = "start";
const INPUT_MOVE = "move";
const INPUT_END = "end";

const BRUSH_MODE = "brush";
const ERASER_MODE = "eraser";

const Canvas = ({ isVisible, canvasRef, canvasKeyword, index }) => {
  const [getCtx, setGetCtx] = useState(null); //드로잉 영역
  const [screenInputMode, setScreenInputMode] = useState(INPUT_END); // 터치, 마우스 입력 모드

  const bgCanvasRef = useRef(null);

  const [drawMode, setDrawMode] = useState(BRUSH_MODE); // 그리기 모드
  const [history, setHistory] = useState([]); //실행 취소
  const images = useRecoilValue(imageState);

  const [brushSize, setBrushSize] = useRecoilState(brushSizeState); //브러쉬 크기
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorState); //선택된 색상

  const [imageUrl, setImageUrl] = useState(
    "https://tukorea-dp.s3.amazonaws.com/image/test.png"
  );
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    if (canvasRef === null) return;
    initializeCanvas();
  }, []);

  //브러쉬 크기, 펜 색상 변경 시 호출됨
  useEffect(() => {
    if (canvasRef === null || getCtx === null) return;
    getCtx.lineWidth = brushSize;
    getCtx.strokeStyle = selectedColor;
    console.log(brushSize, selectedColor);
  }, [brushSize, selectedColor]);

  //드로잉 영역 초기 세팅
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bgCtx = bgCanvasRef.current.getContext("2d");
    const backgroundImage = new Image();
    backgroundImage.src = imageUrl;
    bgCtx.drawImage(backgroundImage, 0, 0, 300, 150);

    ctx.lineJoin = "round"; //선이 꺽이는 부분의 스타일
    ctx.lineWidth = brushSize; //선의 두께
    ctx.strokeStyle = "#000000"; //선의 색

    if (images) {
      const matchedImage = images.find(
        (item) => item.keyword === canvasKeyword
      );
      setImageUrl(matchedImage?.imageUrl);
      setBgOpacity(matchedImage?.bgOpacity);
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setGetCtx(ctx);
    setSelectedColor("#000000");
  };

  //그리기, 지우기 기능
  const drawFn = (x, y) => {
    const ctx = canvasRef.current.getContext("2d");

    // 그리기전이라면 그리기 시작
    if (screenInputMode === INPUT_END) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      return;
    }

    // 그리기 모드에 따라 그리기 또는 지우기
    if (drawMode === ERASER_MODE) {
      ctx.clearRect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
    }

    if (drawMode === BRUSH_MODE) {
      ctx.lineTo(x, y);
      ctx.stroke();
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

  // 터치 이벤트 핸들러 함수
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left + window.scrollX;
    const y = touch.clientY - rect.top + window.scrollY;
    setScreenInputMode(INPUT_START);
    drawFn(x, y);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left + window.scrollX;
    const y = touch.clientY - rect.top + window.scrollY;
    setScreenInputMode(INPUT_MOVE);
    drawFn(x, y);
  };

  const handleTouchEnd = () => {
    setScreenInputMode(INPUT_END);
    updateCanvasState();
  };
  // 캔버스 크기를 반응형으로 조절하기 위해 화면의 크기를 받아와서 조정
  const [width, setWidth] = useState(window.innerWidth);
  const resizeListener = () => {
    const size = window.innerWidth > 450 ? 450 : window.innerWidth;
    setWidth(Math.ceil(size * 0.9));
  };

  useEffect(() => {
    resizeListener();
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [window.innerWidth]);

  // 마우스 클릭 이벤트 핸들러 함수
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + window.scrollX;
    const y = e.clientY - rect.top + window.scrollY;
    setScreenInputMode(INPUT_START);
    drawFn(x, y);
  };

  const handleMouseMove = (e) => {
    if (screenInputMode === INPUT_START || screenInputMode === INPUT_MOVE) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + window.scrollX;
      const y = e.clientY - rect.top + window.scrollY;
      drawFn(x, y);
    }
  };

  const handleMouseUp = () => {
    setScreenInputMode(INPUT_END);
    updateCanvasState();
  };

  return (
    <div
      style={{ display: isVisible ? "block" : "none" }}
      className={"relative"}
    >
      <canvas
        ref={canvasRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width={width}
        height={width}
        style={{
          touchAction: "none",
          border: "4px solid #D9D9D9",
          zIndex: 100,
        }}
      />
      <canvas
        ref={bgCanvasRef}
        id={"bgCanvas"}
        className={
          "absolute top-0 left-0 border-[4px] box-content border-white bg-cover -z-10 bg-no-repeat"
        }
        style={{
          width: width + "px",
          height: width + "px",
          opacity: bgOpacity,
        }}
      />
      {/* 전체삭제, 뒤로가기, 브러쉬, 지우개 */}
      <div className={"flex justify-between items-center mt-[10px] mb-[15px]"}>
        <TrashButton clearCanvas={clearCanvas} />
        <UnDoButton
          canvasRef={canvasRef}
          clearCanvas={clearCanvas}
          history={history}
        />
        <SelectedColor selectedColor={selectedColor} />
        <BrushButton drawMode={drawMode} setDrawMode={setDrawMode} />
        <EraserButton drawMode={drawMode} setDrawMode={setDrawMode} />
      </div>
      {/* 브러쉬 크기 조정  */}
      <ChangeBrushSizeRangeComp
        brushSize={brushSize}
        setBrushSize={setBrushSize}
      />
    </div>
  );
};

const TrashButton = ({ clearCanvas }) => {
  return (
    <IoTrashOutline
      size={55}
      onClick={clearCanvas}
      className={"cursor-pointer"}
    />
  );
};

const UnDoButton = ({ canvasRef, history, clearCanvas }) => {
  //실행 취소
  const unDo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    history.pop(); // 현재 상태 제거

    if (history.length > 1) {
      const prevState = history[history.length - 1];
      ctx.putImageData(prevState, 0, 0);
      return;
    }

    clearCanvas();
  };

  return <AiOutlineRollback size={55} onClick={unDo} />;
};

const SelectedColor = ({ selectedColor }) => {
  return (
    <div
      style={{
        backgroundColor: `${selectedColor}`,
        width: "120px ",
        borderRadius: "30px",
        height: "40px",
      }}
    />
  );
};

const BrushButton = ({ drawMode, setDrawMode }) => {
  return (
    <HiOutlinePaintBrush
      size={55}
      onClick={() => setDrawMode(BRUSH_MODE)}
      color={drawMode === BRUSH_MODE ? "red" : "black"}
    />
  );
};

const EraserButton = ({ drawMode, setDrawMode }) => {
  return (
    <TfiEraser
      size={55}
      onClick={() => setDrawMode(ERASER_MODE)}
      color={drawMode === ERASER_MODE ? "red" : "black"}
    />
  );
};

const ChangeBrushSizeRangeComp = ({ brushSize, setBrushSize }) => {
  useEffect(() => {
    setBrushSize(brushSize);
  }, []);

  const changeLineWidth = (event) => {
    setBrushSize(parseInt(event.target.value));
  };

  return (
    <div className={"flex flex-row justify-start items-center "}>
      <p className={"text-xl w-2/5 text-nowrap text-start "}>
        브러쉬 크기 {brushSize}
      </p>
      <input
        type="range"
        defaultValue="3"
        min="1"
        max="20"
        step="1"
        value={brushSize}
        onChange={changeLineWidth}
        className={"w-3/5"}
      />
    </div>
  );
};

export default Canvas;
