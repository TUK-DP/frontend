import { useEffect, useState } from "react";
import Center from "../api/center.controller";

export const useGetNearByCenter = ({ latitude, longitude }) => {
  const [position, setPosition] = useState({
    latitude: latitude, //  위도
    longitude: longitude, // 경도
  });

  // position 객체의 latitude, longitude가 정상적으로 설정되었는지 여부
  const [isPositionFetchingDone, setIsPositionFetchingDone] = useState(false);
  const [isCenterDataFetchingDone, setIsCenterDataFetchingDone] =
    useState(true);

  // 사용자가 입력한 반경
  const [inputRadius, setInputRadius] = useState(""); //입력받은 거리(반경)
  const onRadiusChange = (event) => {
    setInputRadius(event.target.value);
  };

  const [centers, setCenters] = useState(undefined); //주변 센터 목록

  const fetchNearbyCenters = async () => {
    if (!isPositionFetchingDone) {
      // 위치 정보를 가져오는 중이라면, fetchNearbyCenters 함수를 실행하지 않음
      return;
    }

    setIsCenterDataFetchingDone(false);

    let response;

    try {
      response = await Center.searchCenter({
        lat: position.latitude,
        lon: position.longitude,
        radius: parseInt(inputRadius),
      });
    } catch (e) {
      console.log("Error fetching nearby centers:", e.message);
      return;
    }

    setIsCenterDataFetchingDone(true);

    const { isSuccess, message, result } = response.data;

    // isSuccess가 false라면, 에러 메시지를 출력하고 함수를 종료
    if (isSuccess === false) {
      console.error("Error fetching nearby centers:", message);
      return;
    }

    const centerList = result.map((center) => ({
      name: center["치매센터명"],
      latitude: center["위도"],
      longitude: center["경도"],
      address: center["소재지도로명주소"],
      distance: center["나와의거리"],
    }));

    centerList.sort((a, b) => a.distance - b.distance);
    setCenters(centerList);
  };

  const updatePosition = () => {
    setInputRadius("");
    setIsPositionFetchingDone(false);

    if (window.position) {
      let newPosition = {
        latitude: Number(window.position.latitude),
        longitude: Number(window.position.longitude),
      };
      console.log(newPosition);
      // flutter web에서 위치 정보를 가져왔다면, 해당 위치 정보를 사용
      setPosition(newPosition);
      setIsPositionFetchingDone(true);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsPositionFetchingDone(true);
        },
        (error) => {
          console.log("위치를 가져오는데 실패함 :", error);
          setIsPositionFetchingDone(true);
        }
      );
    } else {
      console.log("지원되지 않는 브라우저 입니다.");
      setIsPositionFetchingDone(true);
    }
  };

  useEffect(() => {
    updatePosition();
  }, []);

  return {
    isPositionFetchingDone,
    isCenterDataFetchingDone,
    inputRadius,
    onRadiusChange,
    centers,
    fetchNearbyCenters,
  };
};
