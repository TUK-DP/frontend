import Canvas from "../component/ImageDiary/Canvas";
import React, { useRef, useState, useEffect } from "react";
import Palette from "../component/ImageDiary/Palette";
import { connect, useDispatch, useSelector } from "react-redux";
import { brushSize } from "../redux/modules/ImageDiary";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../component/Button";
import photo1 from "../assets/mainBtn1.png";
import photo2 from "../assets/mainBtn2.png";
import photo3 from "../assets/mainBtn3.png";
import photo4 from "../assets/mainBtn4.png";
import photo5 from "../assets/mainBtn5.png";
import { SET_PAGENAME } from "../redux/modules/PageName";
import diaryController from "../api/diary.controller";

const Draw = ({ lineWidth, dispatch }) => {
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "그림일기" });
  }, []);
  const diaryId = useSelector((state) => state.DiaryInfo.diaryId);
  const [data, setData] = useState([]);

  useEffect(() => {
    // 일기회상 퀴즈 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await diaryController.getQuiz({
          diaryId: diaryId,
        });
        console.log("API 응답:", response.data);
        const { isSuccess, result } = response.data;

        // if (!isSuccess || !Array.isArray(result) || result.length === 0) {
        //   console.log("일기회상 문제를 생성할 수 없음");
        // }

        const questions = result.map((item) => ({
          question: item.question,
          keywordId: item.keywordId,
        }));

        // setData(questions);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        console.error(error.stack);
      }
    };

    fetchData(); // 함수 호출
  }, []);

  //임시로 보여줄 사진들
  const photos = [photo1, photo2, photo3, photo4, photo5];
  // const photos = [];
  const location = useLocation();
  //추출된 키워드
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
      <div
        className={"flex items-center rounded-2xl h-16 overflow-x-scroll"}
        style={{
          border: "1px solid black",
        }}
      >
        {data.length > 0 ? (
          index === 0 ? (
            <div style={{ width: "50px" }}></div>
          ) : (
            <IoIosArrowBack size={50} onClick={getPrevKeyword} />
          )
        ) : null}
        <p className={"text-4xl flex-grow text-center"}>
          {data.length > 0 ? data[index] : "자유롭게 그려주세요"}
        </p>
        {data.length > 0 && index !== data.length - 1 && (
          <IoIosArrowForward size={50} onClick={getNextKeyword} />
        )}
        {data.length > 0 && index === data.length - 1 && (
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
      {/* 브러쉬 크기 조정 */}
      <div className={"flex flex-row justify-center items-center"}>
        <p className={"text-2xl w-2/5 text-nowrap text-center"}>
          브러쉬 크기 {lineWidth}
        </p>
        <input
          type="range"
          value={lineWidth}
          min="1"
          max="20"
          step="1"
          onChange={changeLineWidth}
          className={"w-3/5"}
        />
      </div>
      {/* 색상팔레트 */}
      <Palette />
      <div>
        {data.length - 1 === index || data.length === 0 ? (
          <Button
            width="100%"
            height="60px"
            text="완료"
            fontSize="30px"
            onClick={saveImage}
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lineWidth: state.ImageDiary.brushSize,
});

export default connect(mapStateToProps)(Draw);
