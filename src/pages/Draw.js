import Canvas from "../component/ImageDiary/Canvas";
import React, { useRef, useState, useEffect } from "react";
import Palette from "../component/ImageDiary/Palette";
import { connect } from "react-redux";
import { brushSize } from "../redux/modules/ImageDiary";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../component/Button";

const Draw = ({ lineWidth, dispatch }) => {
  const location = useLocation();
  //추출된 키워드
  const data = location.state;
  const [index, setIndex] = useState(0);
  //키워드별 저장
  const [savedImages, setSavedImages] = useState([]);

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
  //단어 개수만큼 캔버스 렌더링
  const canvasRefs = useRef(
    data.length > 0 ? data.map(() => React.createRef()) : [React.createRef()]
  );
  const navigate = useNavigate();

  // Canvas 렌더링
  const renderCanvas = () => {
    if (data.length === 0) {
      return <Canvas isVisible={true} canvasRef={canvasRefs.current[0]} />;
    }
    return data.map((keyword, i) => (
      <Canvas
        key={i}
        isVisible={i === index}
        canvasRef={canvasRefs.current[i]}
      />
    ));
  };
  const saveImage = async () => {
    const imagesWithKeywords = await Promise.all(
      canvasRefs.current.map(async (canvasRef, i) => {
        const image = await canvasRef.current.toDataURL();
        const keyword = data[i];
        return { image, keyword };
      })
    );
    setSavedImages(imagesWithKeywords);
  };

  useEffect(() => {
    // 3. savedImages의 값을 photodiary 페이지에 넘겨주면서 페이지를 불러옴
    if (savedImages.length > 0) {
      console.log("Images saved:", savedImages);
      navigate("/photoedit", { state: { data, savedImages } });
    }
  }, [savedImages]);

  return (
    <div className={"flex flex-col m-2 gap-2"}>
      {/* 키워드 */}
      {data.length > 0 ? (
        <div
          className={"flex items-center rounded-2xl h-16 "}
          style={{
            border: "1px solid black",
          }}
        >
          {index === 0 ? (
            <div style={{ width: "50px" }}></div>
          ) : (
            <IoIosArrowBack size={50} onClick={getPrevKeyword} />
          )}
          <p className={"text-4xl flex-grow text-center"}>{data[index]}</p>
          {index === data.length - 1 ? (
            <div style={{ width: "50px" }}></div>
          ) : (
            <IoIosArrowForward size={50} onClick={getNextKeyword} />
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid black",
            margin: "10px",
            borderRadius: "20px",
            height: "60px",
          }}
        >
          <p style={{ fontSize: "25px", flexGrow: "1", textAlign: "center" }}>
            자유롭게 그려주세요
          </p>
        </div>
      )}

      <div className={"border-4 border-[#D9D9D9] w-full h-40 "}></div>
      {/* Canvas */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          touchAction: "none",
        }}
      >
        {renderCanvas()}
      </div>

      {/* 브러쉬 크기 조정 */}
      <div
        style={{
          fontSize: "20px",
          margin: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        브러쉬 크기 {lineWidth}
        <input
          type="range"
          value={lineWidth}
          min="1"
          max="20"
          step="1"
          onChange={changeLineWidth}
          style={{ width: "230px" }}
        />
      </div>
      {/* 색상팔레트 */}
      <Palette />
      <div>
        {" "}
        {data.length - 1 === index || data.length === 0 ? (
          <button
            onClick={saveImage}
            style={{
              backgroundColor: "#82AAE3",
              borderRadius: "10px",
              border: "none",
              fontSize: "20px",
              fontWeight: "600",
              margin: "5px 0px",
              color: "white",
              width: "350px",
              height: "40px",
            }}
          >
            완료
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lineWidth: state.ImageDiary.lineWidth,
});

export default connect(mapStateToProps)(Draw);
