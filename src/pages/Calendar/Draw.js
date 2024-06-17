import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CanvasList } from "../../component/ImageDiary/Canvas";
import Palette from "../../component/ImageDiary/Palette";
import Button from "../../component/Button";
import keywordController from "../../api/keyword.controller";
import imgController from "../../api/img.controller";
import InfiniteScroll from "../../component/ImageDiary/InfiniteScroll";
import AIModal from "../../component/ImageDiary/AIModal";
import { useRecoilState } from "recoil";
import { keywordState } from "../../recoil/keywordState";
import diaryController from "../../api/diary.controller";
import { useNavigate } from "react-router-dom";

const Draw = () => {
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const [keywordInfo, _] = useRecoilState(keywordState);
  //키워드
  const [keyword, setKeyword] = useState(
    keywordInfo.map((item) => item.keyword)
  );
  //캔버스들 저장
  const canvasRefs = useRef(keywordInfo.map((_) => React.createRef()));
  const canvasBgRefs = useRef(keywordInfo.map((_) => React.createRef()));

  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "그림일기" });

    //키워드가 없는 경우
    if (keywordInfo.length === 0) {
      setKeyword(["자유롭게 그려주세요"]);
    }
  }, []);

  return (
    <div className={"flex flex-col m-2 gap-4"}>
      <KeywordNavigation index={index} setIndex={setIndex} keywords={keyword} />
      {/* AI 도움 */}
      <AISuggestionTextAndIconAndModal keywords={keyword} index={index} />
      {/* 다른 사람의 키워드 사진 띄워줄 부분 */}
      <ShowOtherDrawSlider
        keywords={keyword}
        index={index}
        isKeywordExist={keywordInfo.length !== 0}
      />
      {/* Canvas */}
      <CanvasList
        Keywords={keyword}
        canvasRefs={canvasRefs}
        canvasBgRefs={canvasBgRefs}
        index={index}
      />
      {/* 색상팔레트 */}
      <Palette />
      {/* 저장 버튼 */}
      <SaveImageButton
        index={index}
        canvasRefs={canvasRefs}
        canvasBgRefs={canvasBgRefs}
        keywordInfo={keywordInfo}
      />
    </div>
  );
};

const KeywordNavigation = ({ keywords, index, setIndex }) => {
  const isFirstIndex = index === 0;
  const isLastIndex = index === keywords.length - 1;

  //다음 키워드 제시
  const getNextKeyword = () => {
    if (index === keywords.length - 1) return;
    setIndex((index) => index + 1);
  };
  //이전 키워드 제시
  const getPrevKeyword = () => {
    if (keywords === 0) return;
    setIndex((index) => index - 1);
  };
  return (
    <div
      className={
        "flex items-center rounded-2xl h-16 overflow-x-scroll border-[1px] border-black"
      }
    >
      <IoIosArrowBack
        size={40}
        onClick={getPrevKeyword}
        className={isFirstIndex ? "invisible" : ""}
      />
      <p className={"text-3xl flex-1 text-center"}>{keywords[index]}</p>
      <IoIosArrowForward
        size={40}
        onClick={getNextKeyword}
        className={isLastIndex ? "invisible" : ""}
      />
    </div>
  );
};

const AISuggestionTextAndIconAndModal = ({ keywords, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && (
        <AIModal
          onClose={handleModal}
          content="혹시 그림 그리기 어려우신가요?
          아래 버튼을 누르면 이미지가 생성됩니다!"
          keyword={keywords[index]}
        />
      )}
      <div className={"flex flex-row justify-center items-center h-10"}>
        <p className={"text-[#7D7D7D] font-bold text-2xl"}>
          혹시 그림 그리기 어려우신가요?
        </p>
        <AiOutlineExclamationCircle size={40} onClick={() => handleModal()} />
      </div>
    </>
  );
};

const ShowOtherDrawSlider = ({ keywords, index, isKeywordExist }) => {
  //다른 사람 그림 보기
  const [showOtherDraw, setShowOtherDraw] = useState(false);

  //다른 사람 그림 보기 클릭
  const handleClickShowDraw = () => {
    setShowOtherDraw(!showOtherDraw);
  };

  if (!isKeywordExist) {
    return null;
  }

  return (
    <>
      <div
        className={
          "text-[#7D7D7D] font-bold text-lg flex justify-center items-center"
        }
        onClick={() => handleClickShowDraw()}
      >
        다른 사람 그림 보기
        {showOtherDraw && <IoIosArrowUp size={30} />}
        {!showOtherDraw && <IoIosArrowDown size={30} />}
      </div>
      {showOtherDraw &&
        keywords.map((cur, i) => (
          <InfiniteScroll
            isVisible={index === i}
            keyword={keywords[i]}
            key={i}
          />
        ))}
    </>
  );
};

const SaveImageButton = ({ index, canvasRefs, canvasBgRefs, keywordInfo }) => {
  const isKeywordExist = keywordInfo.length !== 0;
  const { saveAllCanvasDrawToKeywordImage } = useSaveCanvasImage({
    canvasRefs,
    canvasBgRefs,
    keywordInfo,
    isKeywordExist,
  });

  return (
    <div>
      {canvasRefs.current.length - 1 === index && (
        <Button
          width="100%"
          height="60px"
          text="완료"
          fontSize="30px"
          onClick={() => {
            saveAllCanvasDrawToKeywordImage();
          }}
        />
      )}
    </div>
  );
};

const useSaveCanvasImage = ({
  canvasRefs,
  canvasBgRefs,
  isKeywordExist,
  keywordInfo,
}) => {
  let navigate = useNavigate();
  //키워드 별 사진을 서버로 전송
  const saveAllCanvasDrawToKeywordImage = async () => {
    const uploadCanvasDrawRequests = new Array(canvasRefs.length).map(
      async (_, i) => {
        return uploadCanvas({ i });
      }
    );

    const uploadedImageUrls = await Promise.all(uploadCanvasDrawRequests);

    const saveKeywordRequests = new Array(canvasRefs.length).map(
      async (_, i) => {
        return saveKeywordImageUrl({ i, uploadedImageUrls });
      }
    );

    await Promise.all(saveKeywordRequests);
    navigate("/calendar");
  };

  const uploadCanvas = async ({ i }) => {
    const canvas = canvasRefs.current[i].current;
    const bgCanvas = canvasBgRefs.current[i].current;

    const ctx = canvas.getContext("2d");
    const bgCtx = bgCanvas.getContext("2d");

    bgCtx.drawImage(canvas, 0, 0);

    bgCtx.globalAlpha = 1.0;

    const formData = new FormData();
    const blob = await new Promise((resolve, reject) => {
      bgCanvas.toBlob((blob) => {
        console.log(blob);
        if (blob) {
          resolve(blob);
        } else {
          reject();
        }
      });
    });

    formData.append("image", blob, "image.png");

    const response = await imgController.uploadImg(formData);

    return response.data.result.imageUrl;
  };

  const saveKeywordImageUrl = async ({ i, uploadedImageUrls }) => {
    return keywordController.saveKeywordImg(keywordInfo[i].keywordId, {
      imgUrl: uploadedImageUrls[i],
    });
  };

  //키워드가 있는 경우 키워드별 이미지 저장
  return { saveAllCanvasDrawToKeywordImage };
};

export default Draw;
