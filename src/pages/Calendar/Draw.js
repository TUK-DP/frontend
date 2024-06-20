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
import { useNavigate } from "react-router-dom";
import DiaryController from "../../api/diary.controller";
import { canvasDrawingState } from "../../recoil/canvasDrawingState";

const Draw = () => {
  const [canvasState, setCanvasState] = useRecoilState(canvasDrawingState);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [keywordInfo, _] = useRecoilState(keywordState);
  const [keyword, setKeyword] = useState(
    keywordInfo.map((item) => item.keyword)
  );
  const canvasRefs = useRef(keywordInfo.map((_) => React.createRef()));
  const canvasBgRefs = useRef(keywordInfo.map((_) => React.createRef()));

  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "그림일기" });

    if (keywordInfo.length === 0) {
      setKeyword(["자유롭게 그려주세요"]);
      canvasRefs.current.push(React.createRef());
      canvasBgRefs.current.push(React.createRef());
    }
  }, [dispatch, keywordInfo]);

  useEffect(() => {
    keyword.forEach((cur) => {
      const canvas = canvasRefs.current[keyword.indexOf(cur)].current;
      const ctx = canvas.getContext("2d");
      const imageData = canvasState[cur];
      if (imageData) {
        ctx.putImageData(imageData, 0, 0);
      }
    });
  });

  return (
    <div className={"flex flex-col m-2 gap-4"}>
      <KeywordNavigation index={index} setIndex={setIndex} keywords={keyword} />
      <AISuggestionTextAndIconAndModal keywords={keyword} index={index} />
      <ShowOtherDrawSlider
        keywords={keyword}
        index={index}
        isKeywordExist={keywordInfo.length !== 0}
      />
      <CanvasList
        Keywords={keyword}
        canvasRefs={canvasRefs}
        canvasBgRefs={canvasBgRefs}
        index={index}
      />
      <Palette />
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

  const getNextKeyword = () => {
    if (index === keywords.length - 1) return;
    setIndex((index) => index + 1);
  };

  const getPrevKeyword = () => {
    if (index === 0) return;
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
          content="혹시 그림 그리기 어려우신가요? 아래 버튼을 누르면 이미지가 생성됩니다!"
          keyword={keywords[index]}
        />
      )}
      <div className={"flex flex-row justify-center items-center h-10"}>
        <p
          className={
            "text-[#7D7D7D] font-bold text-center text-[1.4rem] break-keep"
          }
        >
          혹시 그림 그리기 어려우신가요?
        </p>
        <AiOutlineExclamationCircle size={40} onClick={() => handleModal()} />
      </div>
    </>
  );
};

const ShowOtherDrawSlider = ({ keywords, index, isKeywordExist }) => {
  const [showOtherDraw, setShowOtherDraw] = useState(false);

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
  keywordInfo,
  isKeywordExist,
}) => {
  let navigate = useNavigate();
  const diaryId = useSelector((state) => state.DiaryInfo.diaryId);
  const saveAllCanvasDrawToKeywordImage = async () => {
    const uploadCanvasDrawRequests = [];

    for (let i = 0; i < canvasRefs.current.length; i++) {
      uploadCanvasDrawRequests.push(
        uploadCanvasImageToUrl({
          canvas: canvasRefs.current[i].current,
          bgCanvas: canvasBgRefs.current[i].current,
        })
      );
    }

    let uploadedImageUrls;

    try {
      uploadedImageUrls = await Promise.all(uploadCanvasDrawRequests);
    } catch (e) {
      console.log(e);
      console.log(
        "이미지를 blob데이터로 변환하는데 실패했습니다. 다시 시도해 주세요"
      );
      return;
    }

    let saveKeywordRequests = [];

    for (let i = 0; i < canvasRefs.current.length; i++) {
      saveKeywordRequests.push(
        saveKeywordImageUrl({
          keywordInfo: keywordInfo[i],
          uploadedImageUrl: uploadedImageUrls[i],
        })
      );
    }

    try {
      await Promise.all(saveKeywordRequests);
    } catch (e) {
      console.log(e);
      console.log(
        "이미지를 서버에 저장하는데 실패했습니다. 다시 시도해 주세요"
      );
      return;
    }

    navigate("/calendar");
  };

  const uploadCanvasImageToUrl = async ({ canvas, bgCanvas }) => {
    const formData = new FormData();

    let resultCanvas = mergeCanvas({ canvas, bgCanvas });
    const blob = await canvasToBlob({ canvas: resultCanvas });

    formData.append("image", blob, "image.png");

    const response = await imgController.uploadImg(formData);

    return response.data.result.imageUrl;
  };

  const saveKeywordImageUrl = async ({ keywordInfo, uploadedImageUrl }) => {
    if (isKeywordExist) {
      return await keywordController.saveKeywordImg(keywordInfo.keywordId, {
        imgUrl: uploadedImageUrl,
      });
    } else {
      return await DiaryController.saveDiaryImg(diaryId, {
        imgUrl: uploadedImageUrl,
      });
    }
  };

  return { saveAllCanvasDrawToKeywordImage };
};

const mergeCanvas = ({ canvas, bgCanvas }) => {
  const resultCanvas = document.createElement("canvas");
  resultCanvas.width = canvas.width;
  resultCanvas.height = canvas.height;

  const resultCtx = resultCanvas.getContext("2d");

  resultCtx.drawImage(bgCanvas, 0, 0, canvas.width, canvas.height);
  resultCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
  resultCtx.globalAlpha = 1.0;

  return resultCanvas;
};

const canvasToBlob = async ({ canvas }) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("blob 데이터 변환 실패"));
      }
    });
  });
};

export default Draw;
