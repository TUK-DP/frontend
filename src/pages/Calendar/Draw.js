import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";
import { useNavigate } from "react-router-dom";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Canvas from "../../component/ImageDiary/Canvas";
import Palette from "../../component/ImageDiary/Palette";
import Button from "../../component/Button";
import keywordController from "../../api/keyword.controller";
import imgController from "../../api/img.controller";
import InfiniteScroll from "../../component/ImageDiary/InfiniteScroll";
import AIModal from "../../component/ImageDiary/AIModal";
import { useRecoilState } from "recoil";
import { indexState, keywordState } from "../../recoil/keywordState";
const Draw = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "그림일기" });
  }, []);

  const navigate = useNavigate();
  const [index, setIndex] = useRecoilState(indexState);
  const [keywordInfo, setKeywordInfo] = useRecoilState(keywordState);
  useEffect(() => {
    console.log(keywordInfo);
  }, [keywordInfo]);
  // //키워드
  const [keyword, setKeyword] = useState([]);
  // //키워드 아이디
  const [keywordId, setKeywordId] = useState([]);
  //캔버스들 저장
  const canvasRefs = useRef({});
  //키워드별 사진 저장(base64 형태) -> photoedit으로 넘겨줌
  const [savedImages, setSavedImages] = useState([]);
  //키워드가 존재하는 지의 여부
  const [isKeywordExist, setIsKeywordExist] = useState();
  //다른 사람 그림 보기
  const [showOtherDraw, setShowOtherDraw] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //다른 사람 그림 보기 클릭
  const handleClickShowDraw = () => {
    setShowOtherDraw(!showOtherDraw);
    console.log(showOtherDraw);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    //키워드가 없는 경우
    if (keywordInfo.length == 0) {
      setKeyword(["자유롭게 그려주세요"]);
      setIsKeywordExist(false);
    }

    //키워드가 있는 경우
    if (keywordInfo.length !== 0) {
      setIsKeywordExist(true);
      setKeyword(keywordInfo.map((item) => item.keyword));
      setKeywordId(keywordInfo.map((item) => item.keywordId));
    }
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
  // 캔버스 렌더링
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

  const renderPhoto = () => {
    return keyword.map((cur, i) => (
      <InfiniteScroll isVisible={index === i} keyword={keyword[i]} key={i} />
    ));
  };

  // 키워드 별 사진 저장(base64 형태)
  const base64Images = async () => {
    const images = await Promise.all(
      canvasRefs.current.map(async (canvasRef, i) => {
        const image = await canvasRef.current.toDataURL();
        return image;
      })
    );
    setSavedImages(images);
  };

  useEffect(() => {
    // 3. savedImages의 값을 photodiary 페이지에 넘겨주면서 페이지를 불러옴
    if (savedImages.length > 0) {
      navigate("/photoedit", { state: savedImages });
    }
  }, [savedImages]);

  //키워드 별 사진을 서버로 전송
  const postImg = async () => {
    try {
      const requests = canvasRefs.current.map(async (canvasRef, i) => {
        const formData = new FormData();
        await new Promise((resolve, reject) => {
          canvasRef.current.toBlob((blob) => {
            if (blob) {
              formData.append("image", blob, i + "image.png");
              resolve();
            } else {
              reject(new Error("Failed to convert canvas to blob."));
            }
          });
        });
        return imgController.uploadImg(formData);
      });

      const responses = await Promise.all(requests);
      const photo = responses.map((res) => res.data.result.imageUrl);
      return photo; // 이미지 URL 배열 반환
    } catch (err) {
      console.log(err);
    }
  };

  //키워드 별 이미지 저장
  const saveKeywordImg = async (photos) => {
    try {
      const requests = keywordId.map(async (keyId, i) => {
        console.log(photos[i]);
        return keywordController.saveKeywordImg(keyId, {
          imgUrl: photos[i],
        });
      });
      const responses = await Promise.all(requests);
      console.log(responses);
    } catch (err) {
      console.log(err);
    }
  };

  const saveImage = async () => {
    try {
      const photos = await postImg(); // postImg 함수의 반환값을 받아옴
      if (!isKeywordExist) return;
      console.log(photos);
      await saveKeywordImg(photos); // saveKeywordImg 함수에 이미지 URL 배열 전달
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickAIButton = () => {
    navigate("/draw/help", {
      state: {
        keyword: keyword[index],
      },
    });
  };

  return (
    <div className={"flex flex-col m-2 gap-4"}>
      {/* 키워드 */}
      <div
        className={"flex items-center rounded-2xl h-16 overflow-x-scroll"}
        style={{
          border: "1px solid black",
        }}
      >
        {keyword.length > 0 ? (
          index === 0 ? (
            <div style={{ width: "40px" }}></div>
          ) : (
            <IoIosArrowBack size={40} onClick={getPrevKeyword} />
          )
        ) : null}
        <p className={"text-3xl flex-grow text-center"}>{keyword[index]}</p>
        {keyword.length > 0 && index !== keyword.length - 1 && (
          <IoIosArrowForward size={40} onClick={getNextKeyword} />
        )}
        {keyword.length > 0 && index === keyword.length - 1 && (
          <div style={{ width: "40px" }}></div>
        )}
      </div>
      {/* AI 도움 */}
      <div className={"flex flex-row justify-center items-center h-10"}>
        <p className={"text-[#7D7D7D] font-bold text-2xl"}>
          혹시 그림 그리기 어려우신가요?
        </p>
        <AiOutlineExclamationCircle size={40} onClick={() => handleModal()} />
      </div>
      <div
        className={
          "text-[#7D7D7D] font-bold text-lg flex flex-row justify-center items-center"
        }
        onClick={() => handleClickShowDraw()}
      >
        다른 사람 그림 보기
        {showOtherDraw ? (
          <IoIosArrowUp size={30} />
        ) : (
          <IoIosArrowDown size={30} />
        )}
      </div>
      {/* 사진 띄워줄 부분 */}
      {isKeywordExist && showOtherDraw && renderPhoto()}
      {/* Canvas */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {renderCanvas()}
      </div>
      {/* 색상팔레트 */}
      <h2 className={"text-[#7D7D7D] pl-2 text-lg font-bold"}>
        옆으로 넘겨서 더 많은 색상을 볼 수 있어요!
      </h2>
      <Palette />
      <div>
        {keyword.length - 1 === index || keyword.length === 0 ? (
          <Button
            width="100%"
            height="60px"
            text="완료"
            fontSize="30px"
            onClick={() => {
              saveImage();
              base64Images();
            }}
          />
        ) : null}
      </div>
      {isModalOpen && (
        <AIModal
          onClose={handleModal}
          content="혹시 그림 그리기 어려우신가요?
          아래 버튼을 누르면 이미지가 생성됩니다!"
          keyword={keyword[index]}
        />
      )}
    </div>
  );
};

export default Draw;
