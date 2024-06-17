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

export const CanvasList = ({ Keywords, canvasRefs, canvasBgRefs, index }) => {
  return (
    <div className={"flex flex-col items-center"}>
      {Keywords.map((cur, i) => (
        <Canvas
          key={i}
          isVisible={index === i}
          canvasRef={canvasRefs.current[i]}
          canvasBgRef={canvasBgRefs.current[i]}
          canvasKeyword={cur}
          arrIdx={i}
        />
      ))}
    </div>
  );
};

const Canvas = ({
  isVisible,
  canvasRef,
  canvasBgRef,
  canvasKeyword,
  arrIdx,
}) => {
  const [screenInputMode, setScreenInputMode] = useState(INPUT_END); // 입력 모드
  const [drawMode, setDrawMode] = useState(BRUSH_MODE); // 그리기 모드
  const [history, setHistory] = useState([]);

  //드로잉 영역 초기 세팅
  let { clearCanvas } = useInitializeCanvas({
    canvasRef,
    canvasBgRef,
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
      <BackGroundCanvas
        bgCanvasRef={canvasBgRef}
        canvasKeyword={canvasKeyword}
        width={width}
        arrIdx={arrIdx}
      />
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
        zIndex: 1,
      }}
    />
  );
};

const BackGroundCanvas = ({ bgCanvasRef, width, canvasKeyword, arrIdx }) => {
  const images = useRecoilValue(imageState);

  useEffect(() => {
    const bgCtx = bgCanvasRef.current.getContext("2d");

    const findAiImages = images.find((cur) => {
      return cur.keyword === canvasKeyword;
    });
    if (findAiImages) {
      console.log(findAiImages.bgOpacity);
      bgCtx.globalAlpha = findAiImages.bgOpacity;
    }
  }, [images]);

  return (
    <canvas
      ref={bgCanvasRef}
      id={"bgCanvas" + arrIdx}
      className={
        "absolute top-0 left-0 border-[4px] box-content border-white bg-cover -z-10 bg-no-repeat"
      }
      style={{
        width: width + "px",
        height: width + "px",
      }}
    />
  );
};

const useInitializeCanvas = ({ canvasRef, canvasBgRef, canvasKeyword }) => {
  const [brushSize, _] = useRecoilState(brushSizeState); //브러쉬 크기
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorState); //선택된 색상
  const aiImages = useRecoilValue(imageState);

  useEffect(() => {
    //드로잉 영역 초기 세팅
    const canvas = canvasRef.current;
    const bgCanvas = canvasBgRef.current;
    const ctx = canvas.getContext("2d");
    const bgCtx = canvasBgRef.current.getContext("2d");

    ctx.lineJoin = "round"; //선이 꺽이는 부분의 스타일
    ctx.lineWidth = brushSize; //선의 두께
    ctx.strokeStyle = selectedColor; //선의 색

    setSelectedColor("#000000");

    bgCtx.fillStyle = "white";
    bgCtx.fillRect(0, 0, canvas.width, canvas.height);

    // ai 가 제시한 image url 찾기
    let findAiSuggest = aiImages.find((i) => i.keyword === canvasKeyword);

    // 있다면 이미지를 배경에 그려줌
    if (findAiSuggest) {
      console.log(findAiSuggest);
      const backgroundImage = new Image();
      backgroundImage.crossOrigin = "anonymous";
      backgroundImage.src =
        findAiSuggest.imageUrl + `?v=${new Date().getTime()}`;
      backgroundImage.onload = () => {
        bgCtx.drawImage(backgroundImage, 0, 0, bgCanvas.width, bgCanvas.height);
        canvasBgRef.current.globalAlpha = findAiSuggest.bgOpacity;
      };
    }
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
