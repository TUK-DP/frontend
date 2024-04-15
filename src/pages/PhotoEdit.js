import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../component/ImageDiary/Image.js";
import html2canvas from "html2canvas";
import Button from "../component/Button.js";

const PhotoEdit = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const images = location.state?.savedImages || [];
  const [imageDataUrl, setImageDataUrl] = useState([]);

  useEffect(() => {
    if (imageDataUrl.length > 0) {
      navigate("/diary/show", { state: { imageDataUrl } });
    }
  }, [imageDataUrl]);

  const captureImage = () => {
    const element = document.getElementById("limit");
    html2canvas(element).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      setImageDataUrl(dataUrl);

      console.log("Captured image:", dataUrl);
    });
  };

  // 캔버스 크기를 반응형으로 조절하기 위해 화면의 크기를 받아와서 조정
  const [width, setWidth] = useState();
  const resizeListener = () => {
    const size = window.innerWidth > 450 ? 450 : window.innerWidth;
    console.log(size);
    setWidth(Math.ceil(size * 0.9));
  };

  useEffect(() => {
    resizeListener();
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);
  // 배경 리스트
  const list = [
    { name: "없음", url: "/" },
    { name: "낮", url: "/day" },
    { name: "밤", url: "/night" },
    { name: "비", url: "/rain" },
    { name: "눈", url: "/snow" },
    { name: "구름", url: "/cloud" },
    { name: "바람", url: "/wind" },
    { name: "낙엽", url: "/leave" },
    { name: "벚꽃", url: "/blossom" },
  ];
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  // 배경 변경
  const changeBg = (url, index) => {
    setBackgroundUrl(`${url}.png`);
    setSelectedButtonIndex(index);
  };

  // 배경 투명도
  const bgOpacity = ["30%", "50%", "70%", "100%"];
  return (
    <div className={"flex flex-col w-11/12 mx-auto my-5 text-xl"}>
      {/* 배경 선택 */}
      <p className={"mb-4"}>배경</p>
      <div className={"whitespace-nowrap overflow-x-scroll "}>
        {list.map((item, index) => (
          <button
            key={index}
            className={`${
              selectedButtonIndex === index ? "bg-[#B0B0B0]" : "bg-[#EDEDED]"
            }   px-5 py-2 rounded-xl h-12 mr-2 justify-center`}
            onClick={() => changeBg(item.url, index)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {/* 배경 투명도 설정 */}
      {/* <p className={"mb-4"}>배경 투명도 설정</p>
      <div className={"whitespace-nowrap overflow-x-scroll "}>
        {bgOpacity.map((item, index) => (
          <button
            key={index}
            className={
              " bg-[#EDEDED] px-5 py-2 rounded-xl h-12 mr-2 justify-center"
            }
          >
            {item}
          </button>
        ))}
      </div> */}
      {/* 그림 편집기 */}
      <div className={"border-4 border-[#D9D9D9] my-10"}>
        <div
          id="limit"
          style={{
            width: width,
            height: width,
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${process.env.PUBLIC_URL}/Background${backgroundUrl})`,
            backgroundSize: "cover",
          }}
        >
          {/* 키워드 별 그림들 배치 */}
          {images.length > 0 ? (
            images.map((image, index) => (
              <Image
                key={index}
                image={image.image}
                initialPo={{
                  x: (index % 3) * 100,
                  y: Math.floor(index / 3) * 100,
                }}
              />
            ))
          ) : (
            <p>No Image</p>
          )}
        </div>
      </div>
      {/* 완료 버튼 */}
      <div className={"flex w-full items-center justify-center"}>
        <Button width="100%" height="50px" text="완료" onClick={captureImage} />
      </div>
    </div>
  );
};

export default PhotoEdit;
