import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import imgController from "../../api/img.controller";
import SimpleImageSlider from "react-simple-image-slider";
import Modal from "../../component/Modal";

const HelpForAi = () => {
  const location = useLocation();
  const keyword = location.state.keyword;
  const navigate = useNavigate();
  // AI가 생성한 이미지
  const [aiImages, setAiImages] = useState([]);
  const getImageForAI = async () => {
    // keyword가 "자유롭게 그려주세요"이거나, prompt가 keyword를 포함하는 경우
    if (
      (keyword === "자유롭게 그려주세요" && prompt) ||
      (prompt && prompt.includes(keyword))
    ) {
      try {
        const res = await imgController.generateImage({
          password: "password",
          prompt: prompt,
          n: 3,
        });
        console.log(res.data);
        setAiImages(res.data.result.urls);
      } catch (error) {
        console.error(error);
      }
    } else {
      // 그 외의 경우 모달을 표시
      handleModal();
    }
  };

  // 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 프롬포트
  const [prompt, setPrompt] = useState("");
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  // 화면 크기 조절
  const resizeListener = () => {
    const size = window.innerWidth > 450 ? 450 : window.innerWidth;
    setFullWidth(Math.ceil(size * 0.9));
  };
  useEffect(() => {
    resizeListener();
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);
  const [fullWidth, setFullWidth] = useState();
  //현재 슬라이더의 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  const onSlideChange = (index) => {
    setCurrentIndex(index - 1);
  };

  const handleClickSelectButton = () => {
    if (aiImages.length === 0) return;
    navigate("/draw/help/result", {
      state: {
        keyword: keyword,
        image: aiImages[currentIndex],
        fullWidth: fullWidth,
      },
    });
  };
  return (
    <div className={"flex flex-col p-2 justify-center items-center"}>
      <h1
        className={
          "flex items-center rounded-2xl h-16 w-full text-3xl justify-center"
        }
        style={{
          border: "1px solid black",
        }}
      >
        {keyword}
      </h1>
      <div
        className={
          "flex flex-1 flex-col w-full my-2 gap-2 justify-center items-center"
        }
      >
        <h2 className={"justify-start w-full text-xl"}>
          키워드에 대한 설명을 적어주세요.
        </h2>
        <div className={"h-12 flex flex-row text-xl w-full gap-1"}>
          <input
            placeholder="예) 바나나 먹는 원숭이"
            className={
              "border-4 h-full border-[#D9D9D9] flex-1 outline-none p-4"
            }
            value={prompt}
            onChange={handlePromptChange}
          />
          <button
            className={"bg-REMEMORY text-white font-semibold px-2"}
            onClick={getImageForAI}
          >
            완료
          </button>
        </div>
        <h2 className={"text-xl text-[#FF0000]"}>
          키워드를 꼭 포함시켜서 적어주세요!
        </h2>
        {/* AI가 생성한 그림 띄워주기 */}
        <div className={"relative mb-4"}>
          {aiImages.length > 0 && (
            <SimpleImageSlider
              width={fullWidth}
              height={fullWidth}
              images={aiImages}
              showBullets={true}
              showNavs={true}
              navMargin={0}
              onStartSlide={onSlideChange}
            />
          )}
        </div>
        <div
          className={"flex flex-row w-full gap-4 justify-center items-center"}
        >
          <Button
            text="선택"
            width="50%"
            height="50px"
            onClick={handleClickSelectButton}
          />
          <Button
            text="취소"
            width="50%"
            height="50px"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={handleModal}
          content="키워드를 포함시켜주세요"
        />
      )}
    </div>
  );
};

export default HelpForAi;
