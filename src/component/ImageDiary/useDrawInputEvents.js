import { BRUSH_MODE, ERASER_MODE } from "./DrawTools";
import { useRecoilState } from "recoil";
import { brushSizeState, selectedColorState } from "../../recoil/canvasState";
import { useEffect, useState } from "react";

export const INPUT_START = "start";
export const INPUT_MOVE = "move";
export const INPUT_END = "end";

export const useDrawInputEvents = ({
  canvasRef,
  screenInputMode,
  drawMode,
  setScreenInputMode,
  setHistory,
}) => {
  const [brushSize, _] = useRecoilState(brushSizeState); //브러쉬 크기
  const [selectedColor, __] = useRecoilState(selectedColorState); //선택된 색상

  //브러쉬 크기, 펜 색상 변경 시 호출됨
  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = selectedColor;
  }, [brushSize, selectedColor]);

  const drawFn = (x, y) => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
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

  // 캔버스 상태를 히스토리에 업데이트하는 함수
  const updateCanvasState = () => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prevHistory) => [...prevHistory, currentState]);
  };

  // 터치 이벤트 핸들러 함수
  const handleTouchStart = (e) => {
    let canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left + window.scrollX;
    const y = touch.clientY - rect.top + window.scrollY;
    setScreenInputMode(INPUT_START);
    drawFn(x, y);
  };

  const handleTouchMove = (e) => {
    let canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left + window.scrollX;
    const y = touch.clientY - rect.top + window.scrollY;
    setScreenInputMode(INPUT_MOVE);
    drawFn(x, y);
  };

  const handleTouchEnd = () => {
    setScreenInputMode(INPUT_END);
    updateCanvasState();
  };

  // 마우스 클릭 이벤트 핸들러 함수
  const handleMouseDown = (e) => {
    let canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left + window.scrollX;
    const y = e.clientY - rect.top + window.scrollY;
    setScreenInputMode(INPUT_START);
    drawFn(x, y);
  };

  const handleMouseMove = (e) => {
    if (screenInputMode === INPUT_END) return;

    let canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left + window.scrollX;
    const y = e.clientY - rect.top + window.scrollY;
    setScreenInputMode(INPUT_MOVE);
    drawFn(x, y);
  };

  const handleMouseUp = () => {
    setScreenInputMode(INPUT_END);
    updateCanvasState();
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
