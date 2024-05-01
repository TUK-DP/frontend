import React, { useEffect, useState } from "react";
import Search from "../assets/search.png";
import DementiaList from "../component/DementiaList";
import Center from "../api/center.controller";

const DementiaCenter = () => {
  const [latitude, setLatitude] = useState(null); //위도
  const [longitude, setLongitude] = useState(null); //경도
  const [distance, setDistance] = useState(""); //입력받은 거리
  const [centers, setCenters] = useState([]); //주변 센터 목록

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getCurrentLocation();
  }, []);

  const fetchNearbyCenters = async () => {
    try {
      const response = await Center.searchCenter({
        lat: latitude,
        lon: longitude,
        radius: parseInt(distance)
      });
      const { isSuccess, message, result } = response.data;
      const centerlist = result.map(center => ({
        name: center["치매센터명"],
        latitude: center["위도"],
        longitude: center["경도"],
        address: center["소재지도로명주소"],
        distance: center["나와의거리"]
      }));
      setCenters(centerlist);
      console.log(centerlist);
    } catch (error) {
      console.error("Error fetching nearby centers:", error);
    }
  };

  const handleSearchClick = () => {
    fetchNearbyCenters();
  };

  return (
    <div className={"flex flex-col justify-start px-2.5 py-5 h-full gap-5"}>
      {/* 검색바 */}
      <div className="flex flex-row items-center border border-1 rounded-2xl gap-5 px-2.5 h-12 border-black">
        <input
          className="flex-grow border-none"
          placeholder="거리(km)를 입력해주세요."
          type="number"
          value={distance}
          onChange={(event) => {
            setDistance(event.target.value);
          }}
        />
        <img
          src={Search}
          className={"h-9 w-9 cursor-pointer"}
          onClick={handleSearchClick}
        />
      </div>
      {/* 치매센터리스트 */}
      <div className={"flex flex-col px-2.5"}>
        {centers.length === 0 ? (
          <div>주변에 치매센터가 존재하지 않습니다.</div>
        ) : (
          <DementiaList centers={centers} />
        )}
      </div>
    </div>
  );
};

export default DementiaCenter;