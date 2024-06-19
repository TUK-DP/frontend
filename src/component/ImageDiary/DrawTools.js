import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { brushSizeState, selectedColorState } from "../../recoil/canvasState";

import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineRollback } from "react-icons/ai";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { TfiEraser } from "react-icons/tfi";
import { canvasDrawingState } from "../../recoil/canvasDrawingState";

export const BRUSH_MODE = "brush";
export const ERASER_MODE = "eraser";

export const TrashButton = ({ clearCanvas }) => {
  return (
    <IoTrashOutline
      size={55}
      onClick={clearCanvas}
      className={"cursor-pointer"}
    />
  );
};

export const UnDoButton = ({
  canvasRef,
  history,
  clearCanvas,
  canvasKeyword,
}) => {
  const [canvasState, setCanvasState] = useRecoilState(canvasDrawingState);

  // 실행 취소 기능
  const unDo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    history.pop(); // 현재 상태 제거

    if (history.length > 0) {
      const prevState = history[history.length - 1];
      ctx.putImageData(prevState, 0, 0);
      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const updatedState = {
        ...canvasState,
        [canvasKeyword]: currentState,
      };
      setCanvasState(updatedState);
    } else {
      clearCanvas();
    }
  };

  return <AiOutlineRollback size={55} onClick={unDo} />;
};

export const SelectedColor = () => {
  const [selectedColor, _] = useRecoilState(selectedColorState); // 선택된 색상
  return (
    <div
      style={{
        backgroundColor: selectedColor,
        width: "120px",
        borderRadius: "30px",
        height: "40px",
      }}
    />
  );
};

export const BrushButton = ({ drawMode, setDrawMode }) => {
  return (
    <HiOutlinePaintBrush
      size={55}
      onClick={() => setDrawMode(BRUSH_MODE)}
      color={drawMode === BRUSH_MODE ? "red" : "black"}
    />
  );
};

export const EraserButton = ({ drawMode, setDrawMode }) => {
  return (
    <TfiEraser
      size={55}
      onClick={() => setDrawMode(ERASER_MODE)}
      color={drawMode === ERASER_MODE ? "red" : "black"}
    />
  );
};

export const ChangeBrushSizeRangeComp = () => {
  const [brushSize, setBrushSize] = useRecoilState(brushSizeState); // 브러쉬 크기

  const changeLineWidth = (event) => {
    setBrushSize(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-row justify-start items-center">
      <p className="text-xl w-2/5 text-nowrap text-start">
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
        className="w-3/5"
      />
    </div>
  );
};
