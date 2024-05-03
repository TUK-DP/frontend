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
import keywordController from "../api/keyword.controller";
import diaryController from "../api/diary.controller";
import imgController from "../api/img.controller";

const Draw = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "그림일기" });
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  //키워드
  const [keyword, setKeyword] = useState([]);
  //키워드 아이디
  const [keywordId, setKeywordId] = useState([]);
  //캔버스들 저장
  const canvasRefs = useRef({});
  //키워드 별 사진 저장
  const [photoData, setPhotoData] = useState([]);
  //서버로 전송된 사진 url 저장
  const [photos, setPhotos] = useState([]);
  //키워드별 사진 가져왔는지의 여부
  const [isGetPhoto, setIsGetPhoto] = useState(false);
  //키워드별 사진 저장(base64 형태) -> photoedit으로 넘겨줌
  const [savedImages, setSavedImages] = useState([]);
  //키워드가 존재하는 지의 여부
  const [isKeywordExist, setIsKeywordExist] = useState();

  //키워드 별 사진 가져오기
  const fetchData = async () => {
    await getPhoto(
      location.state.map((item) => item.keyword),
      1,
      5
    );
    setIsGetPhoto(true);
  };

  useEffect(() => {
    //키워드가 없는 경우
    if (location.state.length == 0) {
      setKeyword(["자유롭게 그려주세요"]);
      setIsKeywordExist(false);
    }

    //키워드가 있는 경우
    if (location.state.length !== 0) {
      setIsKeywordExist(true);
      setKeyword(location.state.map((item) => item.keyword));
      setKeywordId(location.state.map((item) => item.keywordId));
      fetchData();
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

  //키워드 별 사진 가져오기
  const getPhoto = async (keywords, page, pageSize) => {
    try {
      const requests = keywords.map((keyword) => {
        return diaryController.getKeywordPhotos({
          keyword: keyword,
          page: page,
          pageSize: pageSize,
        });
      });

      const responses = await Promise.all(requests);

      const photodata = responses.map((res) => res.data.result[0].results);
      setPhotoData(photodata);
    } catch (err) {
      console.log(err);
    }
  };

  //키워드 별 사진 띄우기
  const renderPhoto = () => {
    if (photoData[index].imgUrls[0] == null) {
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
      setPhotos(photo);
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
      {/* 사진 띄워줄 부분 */}
      {isKeywordExist && (
        <div className={"h-40 w-full flex flex-row overflow-x-auto text-2xl"}>
          {isGetPhoto && renderPhoto()}
        </div>
      )}
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
