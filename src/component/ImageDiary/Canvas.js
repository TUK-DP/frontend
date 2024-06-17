import React, { useEffect, useRef, useState } from "react";
import { imageState } from "../../recoil/keywordState";
import { useRecoilState, useRecoilValue } from "recoil";
import { brushSizeState, selectedColorState } from "../../recoil/canvasState";
import {
  BRUSH_MODE,
  BrushButton,
  ChangeBrushSizeRangeComp,
  EraserButton,
  SelectedColor,
  TrashButton,
  UnDoButton,
} from "./DrawTools";
import { INPUT_END, useDrawInputEvents } from "./useDrawInputEvents";

export const CanvasList = ({ Keywords, canvasRefs, index }) => {
  return (
    <div className={"flex flex-col items-center"}>
      {Keywords.map((cur, i) => (
        <Canvas
          key={i}
          isVisible={index === i}
          canvasRef={canvasRefs.current[i]}
          canvasKeyword={cur}
          arrIdx={i}
        />
      ))}
    </div>
  );
};

const Canvas = ({ isVisible, canvasRef, canvasKeyword, arrIdx }) => {
  const [screenInputMode, setScreenInputMode] = useState(INPUT_END); // 입력 모드
  const [drawMode, setDrawMode] = useState(BRUSH_MODE); // 그리기 모드
  const [history, setHistory] = useState([]);

  const [bgOpacity, setBgOpacity] = useState(1);

  const [imageUrl, setImageUrl] = useState(
    "https://tukorea-dp.s3.amazonaws.com/image/test.png"
  );

  //드로잉 영역 초기 세팅
  let { clearCanvas } = useInitializeCanvas({
    canvasRef,
    setImageUrl,
    setBgOpacity,
    canvasKeyword,
  });

  const width = useGetScreenWidth();

  return (
    <div className={"relative " + (isVisible ? "" : "hidden")}>
      <DrawCanvas
        canvasRef={canvasRef}
        screenInputMode={screenInputMode}
        setScreenInputMode={setScreenInputMode}
        setHistory={setHistory}
        drawMode={drawMode}
        width={width}
        arrIdx={arrIdx}
      />
      {/*<BackGroundCanvas*/}
      {/*  bgCanvasRef={bgCanvasRef}*/}
      {/*  width={width}*/}
      {/*  bgOpacity={bgOpacity}*/}
      {/*/>*/}
      {/* 전체삭제, 뒤로가기, 브러쉬, 지우개 */}
      <div className={"flex justify-between items-center mt-[10px] mb-[15px]"}>
        <TrashButton clearCanvas={clearCanvas} />
        <UnDoButton
          canvasRef={canvasRef}
          clearCanvas={clearCanvas}
          history={history}
        />
        <SelectedColor />
        <BrushButton drawMode={drawMode} setDrawMode={setDrawMode} />
        <EraserButton drawMode={drawMode} setDrawMode={setDrawMode} />
      </div>
      {/* 브러쉬 크기 조정  */}
      <ChangeBrushSizeRangeComp />
    </div>
  );
};

const DrawCanvas = ({
  canvasRef,
  screenInputMode,
  setScreenInputMode,
  setHistory,
  drawMode,
  width,
  arrIdx,
}) => {
  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDrawInputEvents({
    canvasRef,
    drawMode,
    screenInputMode,
    setScreenInputMode,
    setHistory,
  });

  return (
    <canvas
      id={arrIdx}
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
  );
};

const BackGroundCanvas = ({ bgCanvasRef, width, bgOpacity }) => {
  return (
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
  );
};

const useInitializeCanvas = ({
  canvasRef,
  setImageUrl,
  setBgOpacity,
  canvasKeyword,
}) => {
  const images = useRecoilValue(imageState);
  const [brushSize, _] = useRecoilState(brushSizeState); //브러쉬 크기
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorState); //선택된 색상

  useEffect(() => {
    //드로잉 영역 초기 세팅
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // const bgCtx = bgCanvasRef.current.getContext("2d");
    // const backgroundImage = new Image();
    // backgroundImage.src = imageUrl;
    // bgCtx.drawImage(backgroundImage, 0, 0, 300, 150);

    ctx.lineJoin = "round"; //선이 꺽이는 부분의 스타일
    ctx.lineWidth = brushSize; //선의 두께
    ctx.strokeStyle = selectedColor; //선의 색

    if (images) {
      const matchedImage = images.find(
        (item) => item.keyword === canvasKeyword
      );
      setImageUrl(matchedImage?.imageUrl);
      setBgOpacity(matchedImage?.bgOpacity);
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setSelectedColor("#000000");
  }, []);
  //canvas 화면 전체 지우기
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return { clearCanvas };
};

const useGetScreenWidth = () => {
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

  return width;
};
