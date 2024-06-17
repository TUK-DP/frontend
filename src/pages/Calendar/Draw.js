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
      <CanvasList Keywords={keyword} canvasRefs={canvasRefs} index={index} />
      {/* 색상팔레트 */}
      <Palette />
      {/* 저장 버튼 */}
      <SaveImageButton
        keyword={keyword}
        index={index}
        canvasRefs={canvasRefs}
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

const SaveImageButton = ({ keyword, index, canvasRefs, keywordInfo }) => {
  let navigate = useNavigate();

  const diaryId = useSelector((state) => state.DiaryInfo.diaryId);

  const isKeywordExist = keywordInfo.length !== 0;

  //키워드 별 사진을 서버로 전송
  const postImg = async () => {
    try {
      const requests = canvasRefs.map(async (canvasRef, i) => {
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
      return responses.map((res) => res.data.result.imageUrl); // 이미지 URL 배열 반환
    } catch (err) {
      console.log(err);
    }
  };

  //키워드가 있는 경우 키워드별 이미지 저장
  const saveKeywordImg = async (photos) => {
    try {
      const requests = keywordInfo.map(async (info, i) => {
        console.log(photos[i]);
        return keywordController.saveKeywordImg(info.keywordId, {
          imgUrl: photos[i],
        });
      });
      const responses = await Promise.all(requests);
      console.log(responses);
    } catch (err) {
      console.log(err);
    }
  };

  // 이미지 저장
  const saveImage = async () => {
    try {
      const photos = await postImg(); // postImg 함수의 반환값을 받아옴
      console.log(photos);

      // 키워드가 없는 경우
      if (!isKeywordExist) {
        const res = await diaryController.saveDiaryImg(diaryId, {
          imgUrl: photos[0],
        });
      }
      // 키워드가 있는 경우
      if (isKeywordExist) {
        await saveKeywordImg(photos); // saveKeywordImg 함수에 이미지 URL 배열 전달
      }
      navigate("/calendar");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {keyword.length - 1 === index && (
        <Button
          width="100%"
          height="60px"
          text="완료"
          fontSize="30px"
          onClick={() => {
            saveImage();
          }}
        />
      )}
    </div>
  );
};

export default Draw;
