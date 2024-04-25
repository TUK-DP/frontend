import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";
import { useLocation } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Canvas from "../component/ImageDiary/Canvas";
import Palette from "../component/ImageDiary/Palette";
import Button from "../component/Button";

const Draw = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "그림일기" });
  }, []);

  const location = useLocation();
  const [index, setIndex] = useState(0);
  const [keyword, setKeyword] = useState([]);
  const [keywordId, setKeywordId] = useState([]);
  const canvasRefs = useRef([]);
  const photos = [];

  useEffect(() => {
    setKeyword(location.state.map((item) => item.keyword));
    setKeywordId(location.state.map((item) => item.keywordId));
  }, []);
  //다음 키워드 제시
  const getNextKeyword = () => {
    if (index == keyword.length - 1) return;
    setIndex((index) => index + 1);
  };
  //이전 키워드 제시
  const getPrevKeyword = () => {
    if (index == 0) return;
    setIndex((index) => index - 1);
  };
  const renderCanvas = () => {
    canvasRefs.current = keyword.map(() => React.createRef());
    return keyword.map((cur, i) => (
      <Canvas
        key={i}
        isVisible={index === i}
        canvasRef={canvasRefs.current[i]}
      />
    ));
  };

  return (
    <div className={"flex flex-col m-2 gap-2"}>
      {/* 키워드 */}
      <div
        className={"flex items-center rounded-2xl h-16 overflow-x-scroll"}
        style={{
          border: "1px solid black",
        }}
      >
        {keyword.length > 0 ? (
          index === 0 ? (
            <div style={{ width: "50px" }}></div>
          ) : (
            <IoIosArrowBack size={50} onClick={getPrevKeyword} />
          )
        ) : null}
        <p className={"text-4xl flex-grow text-center"}>
          {keyword.length > 0 ? keyword[index] : "자유롭게 그려주세요"}
        </p>
        {keyword.length > 0 && index !== keyword.length - 1 && (
          <IoIosArrowForward size={50} onClick={getNextKeyword} />
        )}
        {keyword.length > 0 && index === keyword.length - 1 && (
          <div style={{ width: "50px" }}></div>
        )}
      </div>
      {/* 사진 띄워줄 부분 */}
      <div className={"h-40 w-full flex flex-row overflow-x-auto text-2xl"}>
        {photos.length == 0 ? (
          <div className={"w-full flex justify-center items-center"}>
            그림이 존재하지 않습니다.
          </div>
        ) : (
          photos.map((item, index) => <img src={item} key={index} />)
        )}
      </div>
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
      {/* 색상팔레트 */}
      <Palette />
      <div>
        {keyword.length - 1 === index || keyword.length === 0 ? (
          <Button
            width="100%"
            height="60px"
            text="완료"
            fontSize="30px"
            // onClick={saveImage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Draw;
