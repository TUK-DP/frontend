import React, { useEffect } from "react";
import GymButton from "../component/GymButton";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";

const Gymnastics = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "체조영상" });
  }, []);
  const info = [
    {
      src: "https://www.youtube.com/embed/AdnvPSutjXA?si=DU3ZJRA0pF6U2eCI",
      title: "온 몸 가다듬기",
      time: "1:03",
      content: "어깨 및 가슴근육 이완",
    },
    {
      src: "https://www.youtube.com/embed/dInp_PxiAnU?si=pLSMxlwlkO6X27A1",
      title: "기 펼치기",
      time: "1:02",
      content: "후두엽, 두정엽 및 전두엽 활성화",
    },
    {
      src: "https://www.youtube.com/embed/If7u-uAsPEw?si=Y_-SCx85gZW8q9qX",
      title: "기 만들기",
      time: "1:53",
      content: "후두엽, 두정엽 및 전두엽 활성화",
    },
    {
      src: "https://www.youtube.com/embed/hdmPqLFQRB8?si=cLeuBItwt9U2upRl",
      title: "팔 운동 - 한 팔로 하기",
      time: "0:37",
      content: "상체 혈액순환 촉진, 인지기능 향상 및 운동능력 향상",
    },
    {
      src: "https://www.youtube.com/embed/QkOYGpfWMVs?si=Wwlvkhr5MP69sQmc",
      title: "팔 운동 - 두 팔로 하기",
      time: "0:27",
      content: "상체 혈액순환 촉진, 인지기능 향상 및 운동능력 향상",
    },
    {
      src: "https://www.youtube.com/embed/D-0PaX61Hh0?si=jv4IZjz0JIe3Jdq7",
      title: "손 운동 - 쥐기",
      time: "1:06",
      content: "인지기능 향상 및 운동능력 향상",
    },
    {
      src: "https://www.youtube.com/embed/UZSYpf-cGZA?si=E4HyaTx29NvG4VXB",
      title: "손 운동 - 박수",
      time: "1:05",
      content: "말초신경 자극, 혈액순환 촉진 및 인지기능 향상",
    },
    {
      src: "https://www.youtube.com/embed/IASWUvx9SRc?si=epyn7N7ALiMoUm91",
      title: "온몸 자극하기",
      time: "0:28",
      content: "어깨 회전범위 확대, 상체 혈액순환 촉진 및 뇌자극",
    },
    {
      src: "https://www.youtube.com/embed/5BQxzv4t8u8?si=wG3IiK9v3cwFUqwy",
      title: "목 돌리기",
      time: "0:38",
      content: "부신경 자극",
    },
    {
      src: "https://www.youtube.com/embed/1TjVR6eso6A?si=5flt0uNWaQX3FfbN",
      title: "볼,혀 쓰기",
      time: "0:38",
      content: "안면신경 및 설하신경 자극",
    },
    {
      src: "https://www.youtube.com/embed/bWgxkKvq3Q0?si=ouMA9Gq_cNNctn8M",
      title: "소리내기",
      time: "1:34",
      content: "삼차신경, 안면신경, 설인신경 및 설하신경 자극",
    },
    {
      src: "https://www.youtube.com/embed/aYwnd0ETcRY?si=CPtjTXPpAzdt-x-g",
      title: "눈돌리기",
      time: "0:49",
      content: "동안신경, 활차신경 및 외전신경 자극",
    },
    {
      src: "https://www.youtube.com/embed/SWNweJwXWMU?si=RnOlul5D2C4l66Vp",
      title: "얼굴 두드리기",
      time: "0:43",
      content: "삼차신경 및 안면신경 자극",
    },
  ];
  return (
    <div
      className={"flex flex-col my-5 mx-2 justify-center items-center gap-4"}
    >
      {info.map((item, index) => (
        <GymButton
          src={item.src}
          title={item.title}
          time={item.time}
          content={item.content}
          key={index}
        />
      ))}
    </div>
  );
};

export default Gymnastics;
