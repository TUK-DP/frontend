import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Canvas from "../component/ImageDiary/Canvas";
import Palette from "../component/ImageDiary/Palette";
import Button from "../component/Button";
import DiaryController from "../api/diary.controller";
import axios from "axios";

const Draw = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "그림일기" });
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [keyword, setKeyword] = useState([]);
  const [keywordId, setKeywordId] = useState([]);
  const canvasRefs = useRef({});
  const [photoData, setPhotoData] = useState([]);
  const photos = [];
  const [isGetPhoto, setIsGetPhoto] = useState(false);
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    setKeyword(location.state.map((item) => item.keyword));
    setKeywordId(location.state.map((item) => item.keywordId));

    const fetchData = async () => {
      await getPhoto(
        location.state.map((item) => item.keyword),
        1,
        5
      );
      setIsGetPhoto(true);
    };
    fetchData();
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
  //Canvas 렌더링
  const renderCanvas = () => {
    if (keyword.length == 0) {
      const canvasRef = React.createRef();
      return <Canvas isVisible={true} canvasRef={canvasRef} />;
    }
    canvasRefs.current = keyword.map(() => React.createRef());
    return keyword.map((cur, i) => (
      <Canvas
        key={i}
        isVisible={index === i}
        canvasRef={canvasRefs.current[i]}
      />
    ));
  };

  //키워드 별 사진 가져오기
  const getPhoto = async (keywords, page, pageSize) => {
    try {
      const requests = keywords.map((keyword) => {
        return DiaryController.getKeywordPhotos({
          keyword: keyword,
          page: page,
          pageSize: pageSize,
        });
      });

      const responses = await Promise.all(requests);

      const photos = responses.map((res) => res.data.result[0].results);
      setPhotoData(photos);
      console.log(photos);
    } catch (err) {
      console.log(err);
    }
  };
  //키워드 별 사진 띄우기
  const renderPhoto = () => {
    // if (photoData.length == 0 || photoData[index].imgUrls[0] == null) {
    if (photoData[index].length == 0) {
      return (
        <div className={"w-full flex justify-center items-center"}>
          그림이 존재하지 않습니다.
        </div>
      );
    }
    return photoData[index].imgUrls.map((item, index) => (
      <img src={item} key={index} />
    ));
  };

  // 키워드 별 사진 저장
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
      console.log(savedImages);
      navigate("/photoedit", { state: savedImages });
    }
  }, [savedImages]);
  //키워드 별 사진을 서버로 전송
  const saveImage = async () => {
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
        return axios.post("http://52.79.249.163:8001/image/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      });

      const response = await Promise.all(requests);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"flex flex-col m-2 gap-2"}>
      {/* 키워드 */}
      <div
        className={"flex items-center rounded-2xl h-16 overflow-x-scroll"}
        style={{
          border: "1px solid black",
        }}
      >
        {keyword.length > 0 ? (
          index === 0 ? (
            <div style={{ width: "50px" }}></div>
          ) : (
            <IoIosArrowBack size={50} onClick={getPrevKeyword} />
          )
        ) : null}
        <p className={"text-4xl flex-grow text-center"}>
          {keyword.length > 0 ? keyword[index] : "자유롭게 그려주세요"}
        </p>
        {keyword.length > 0 && index !== keyword.length - 1 && (
          <IoIosArrowForward size={50} onClick={getNextKeyword} />
        )}
        {keyword.length > 0 && index === keyword.length - 1 && (
          <div style={{ width: "50px" }}></div>
        )}
      </div>
      {/* 사진 띄워줄 부분 */}
      <div className={"h-40 w-full flex flex-row overflow-x-auto text-2xl"}>
        {isGetPhoto && renderPhoto()}
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
      {/* 색상팔레트 */}
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
    </div>
  );
};

export default Draw;
