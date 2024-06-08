import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import imgController from "../../api/img.controller";

const HelpForAi = () => {
  const location = useLocation();
  const keyword = location.state.keyword;
  const navigate = useNavigate();
  const handleClickShowAiResultButton = () => {
    navigate("/draw/help/result", { state: { keyword: keyword } });
  };
  const [aiImages, setAiImages] = useState([]);
  const getImageForAI = async () => {
    try {
      const res = await imgController.generateImage({
        password: "password",
        prompt: "prompt",
        n: 3,
      });
      console.log(res.data);
      setAiImages(res.data.result.urls);
    } catch (error) {
      console.error(error);
    }
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
          />
          <button
            className={"bg-[#D9D9D9] text-white font-semibold px-2"}
            onClick={getImageForAI}
          >
            완료
          </button>
        </div>
        <h2 className={"text-xl text-[#FF0000]"}>
          키워드를 꼭 포함시켜서 그려주세요!
        </h2>
        {/* AI가 생성한 그림 띄워주기 */}
        <div>
          {aiImages.length > 0 &&
            aiImages.map((url, index) => {
              return <img key={index} src={url} alt="AI Image" />;
            })}
        </div>
      </div>
    </div>
  );
};

export default HelpForAi;
