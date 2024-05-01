import React, { useEffect, useState } from "react";
import Search from "../assets/search.png";
import DementiaList from "../component/DementiaList";

const DementiaCenter = () => {
  const [latitude, setLatitude] = useState(null); //위도
  const [longitude, setLongitude] = useState(null); //경도

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
    if (latitude !== null && longitude !== null) {
      console.log("Latitude:", latitude); //위도
      console.log("Longitude:", longitude); //경도
    }
  }, []);

  return (
    <div className={"flex flex-col justify-start px-2.5 py-5 h-full gap-5"}>
      {/* 검색바 */}
      <div className="flex flex-row items-center border border-1 rounded-2xl gap-5 px-2.5 h-12 border-black">
        <input
          className="flex-grow border-none"
          placeholder="거리(km)를 입력해주세요."
        />
        <img src={Search} className={"h-9 w-9"} />
      </div>
      {/* 치매센터리스트 */}
      <div className={"flex flex-col px-2.5"}>
        <DementiaList />
      </div>
    </div>
  );
};

export default DementiaCenter;