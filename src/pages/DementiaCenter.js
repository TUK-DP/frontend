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
      setCenters(response.data);
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
        {/* 주변 치매 센터 목록을 표시합니다. */}
        <DementiaList centers={centers} />
      </div>
    </div>
  );
};

export default DementiaCenter;