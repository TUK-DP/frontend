import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import Button from "../component/Button.js";
import imgController from "../api/img.controller.js";
import diaryController from "../api/diary.controller.js";
import { useSelector } from "react-redux";
import Image2 from "../component/ImageDiary/Image2.js";

const PhotoEdit = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const images = location.state;
  const [imageDataUrl, setImageDataUrl] = useState([]);
  const diaryId = useSelector((state) => state.DiaryInfo.diaryId);
  const [selected, setSelected] = useState(0);

  const changeSelected = (i) => {
    setSelected(i);
    console.log(selected);
  };

  useEffect(() => {
    if (imageDataUrl.length > 0) {
      navigate("/diary/show", { state: { imageDataUrl } });
    }
  }, [imageDataUrl]);

  //캡쳐 후 이미지 저장
  const captureImage = () => {
    changeSelected(-1); // changeSelected 함수 실행

    setTimeout(() => {
      const element = document.getElementById("limit");
      const formData = new FormData();

      html2canvas(element).then((canvas) => {
        canvas.toBlob((blob) => {
          formData.append("image", blob, "image.png");

          // 이미지를 업로드하고 완료될 때까지 기다림
          imgController
            .uploadImg(formData)
            .then((res) => {
              console.log(res.data.result.imageUrl);
              diaryController
                .saveDiaryImg(diaryId, {
                  imgUrl: res.data.result.imageUrl,
                })
                .then((res) => {
                  console.log(res);
                  navigate("/calendar");
                })
                .catch((err) => console.log(err));
            })
            .catch((error) => {
              console.error("이미지 업로드 오류:", error);
            });
        });
      });
    }, 0); // setTimeout을 사용하여 changeSelected가 끝난 후에 실행되도록 함
  };

  // 캔버스 크기를 반응형으로 조절하기 위해 화면의 크기를 받아와서 조정
  const [width, setWidth] = useState();
  const resizeListener = () => {
    const size = window.innerWidth > 450 ? 450 : window.innerWidth;
    setWidth(Math.ceil(size * 0.9));
  };
  // 화면 크기 조절
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
  const [backgroundUrl, setBackgroundUrl] = useState("/");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  // 배경 변경
  const changeBg = (url, index) => {
    setBackgroundUrl(`${url}.png`);
    setSelectedButtonIndex(index);
  };

  // 배경 투명도
  const bgOpacityList = ["30", "50", "70", "100"];
  const [bgOpacity, setBgOpacity] = useState("0.7");
  const [selectedOpacityIndex, setSelectedOpacityIndex] = useState(0);
  // 투명도 변경
  const changeOpacity = (item, index) => {
    setBgOpacity(1 - parseInt(item) * 0.01);
    setSelectedOpacityIndex(index);
  };

  return (
    <div
      className={"flex flex-col mx-auto my-5 text-xl gap-2"}
      style={{ width: "90%" }}
    >
      {/* 배경 선택 */}
      <p className={"mb-2"}>배경</p>
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
      <p className={"mb-2"}>배경 선명도 설정</p>
      <div className={"whitespace-nowrap overflow-x-scroll "}>
        {bgOpacityList.map((item, index) => (
          <button
            key={index}
            className={`${
              selectedOpacityIndex === index ? "bg-[#B0B0B0]" : "bg-[#EDEDED]"
            }  px-5 py-2 rounded-xl h-12 mr-2 justify-center`}
            onClick={() => {
              changeOpacity(item, index);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {/* 그림 편집기 */}
      <div
        className={"border-4 border-[#D9D9D9] my-10 "}
        style={{
          width: width,
          height: width,
        }}
        id="photoEditArea"
      >
        <div
          id="limit"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,${bgOpacity}), rgba(255,255,255,${bgOpacity})), url(${process.env.PUBLIC_URL}/Background${backgroundUrl})`,
            backgroundSize: "cover",
            width: width - 8,
            height: width - 8,
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            position: "relative",
          }}
        >
          {/* 키워드 별 그림들 배치 */}
          {images.length > 0 ? (
            images.map((image, index) => (
              <Image2
                key={index}
                image={image}
                initialPo={{
                  x: (index % 3) * 100,
                  y: Math.floor(index / 3) * 100,
                }}
                selected={selected}
                changeSelected={changeSelected}
                index={index}
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
