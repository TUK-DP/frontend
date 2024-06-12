import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineRollback } from "react-icons/ai";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { TfiEraser } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BRUSH_SIZE, SELECT_COLOR } from "../../redux/modules/ImageDiary";
import { imageState } from "../../recoil/keywordState";
import { useRecoilValue } from "recoil";

const Canvas = ({ isVisible, canvasRef, canvasKeyword }) => {
  const [getCtx, setGetCtx] = useState(null); //드로잉 영역
  const [painting, setPainting] = useState(false); //그리기 모드
  const [erasing, setErasing] = useState(false); //지우기 모드
  const [history, setHistory] = useState([]); //실행 취소
  const brushSize = useSelector((state) => state.ImageDiary.brushSize);
  const selectedColor = useSelector((state) => state.ImageDiary.selectedColor);
  const dispatch = useDispatch();
  const image = useRecoilValue(imageState);
  //드로잉 영역 초기 세팅

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas에 배경 이미지 설정
    if (image) {
      const matchedImage = image.filter(
        (item) => item.keyword === canvasKeyword
      );
      console.log(matchedImage);
      if (matchedImage.length !== 0) {
        const { keyword, imageUrl, bgOpacity } = matchedImage[0];
        const bgImg = new Image();
        bgImg.src = imageUrl;
        bgImg.onload = () => {
          ctx.globalAlpha = bgOpacity; // 투명도 설정
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1; // 투명도 초기화
        };
      } else {
        // 키워드에 맞는 이미지가 없을 경우 흰색 배경으로 설정
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    } else {
      //이미지가 없을 경우 흰색 배경으로 설정
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.lineJoin = "round"; //선이 꺽이는 부분의 스타일
    ctx.lineWidth = 1; //선의 두께
    ctx.strokeStyle = "#000000"; //선의 색

    dispatch({ type: SELECT_COLOR, selectedColor: "#000000" });
    dispatch({ type: BRUSH_SIZE, brushSize: 1 });
    setGetCtx(ctx);
    clearCanvas();
  }, [canvasKeyword, image]); // canvasKeyword와 image가 변경될 때마다 useEffect 실행

  // 브러쉬 크기, 펜 색상 변경 시 호출됨
  useEffect(() => {
    if (getCtx) {
      getCtx.lineWidth = brushSize;
      getCtx.strokeStyle = selectedColor;
    }
  }, [brushSize, selectedColor]);

  //그리기, 지우기 기능
  const drawFn = (x, y) => {
    if (!painting) {
      getCtx.beginPath();
      getCtx.moveTo(x, y);
    } else {
      if (erasing) {
        getCtx.clearRect(
          x - brushSize,
          y - brushSize,
          brushSize * 2,
          brushSize * 2
        );
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
    updateCanvasState();
  };
  // 캔버스 크기를 반응형으로 조절하기 위해 화면의 크기를 받아와서 조정
  const [width, setWidth] = useState();
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
  }, []);
  // 마우스 클릭 이벤트 핸들러 함수
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + window.scrollX;
    const y = e.clientY - rect.top + window.scrollY;
    setPainting(true);
    drawFn(x, y);
  };

  const handleMouseMove = (e) => {
    if (painting) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + window.scrollX;
      const y = e.clientY - rect.top + window.scrollY;
      drawFn(x, y);
    }
  };

  const handleMouseUp = () => {
    setPainting(false);
    updateCanvasState();
  };

  //브러쉬 크기 변경
  const changeLineWidth = (event) => {
    console.log(brushSize);
    dispatch({ type: BRUSH_SIZE, brushSize: parseInt(event.target.value, 10) });
  };

  return (
    <div
      style={{
        display: isVisible ? "block" : "none",
      }}
    >
      <canvas
        ref={canvasRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown} // 마우스 클릭 이벤트 추가
        onMouseMove={handleMouseMove} // 마우스 이동 이벤트 추가
        onMouseUp={handleMouseUp} // 마우스 클릭 종료 이벤트 추가
        width={width}
        height={width}
        style={{
          border: "4px solid #D9D9D9",
          touchAction: "none",
        }}
      ></canvas>
      {/* 전체삭제, 뒤로가기, 브러쉬, 지우개 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0px 15px 0px",
          alignItems: "center",
        }}
      >
        <IoTrashOutline size={55} onClick={clearCanvas} />
        <AiOutlineRollback size={55} onClick={unDo} />
        <div
          style={{
            backgroundColor: `${selectedColor}`,
            width: "120px ",
            borderRadius: "30px",
            height: "40px",
          }}
        ></div>
        <HiOutlinePaintBrush
          size={55}
          onClick={() => {
            setErasing(false);
          }}
          color={erasing ? "black" : "red"}
        />
        <TfiEraser
          size={55}
          onClick={() => setErasing(true)}
          color={erasing ? "red" : "black"}
        />
      </div>
      {/* 브러쉬 크기 조정  */}
      <div className={"flex flex-row justify-start items-center "}>
        <p className={"text-xl w-2/5 text-nowrap text-start "}>
          브러쉬 크기 {brushSize}
        </p>
        <input
          type="range"
          value={brushSize}
          min="1"
          max="20"
          step="1"
          onChange={changeLineWidth}
          className={"w-3/5"}
        />
      </div>
    </div>
  );
};

export default Canvas;
