import React from "react";
import { useLocation } from "react-router-dom";
import KakaoMap from "../component/KakaoMap";

const CenterMap = () => {
  const location = useLocation();
  const { centers, index } = location.state;
  const center = centers[index];

  return (
    <div>
      <div className="text-center font-bold text-[#82AAE3] text-2xl my-5">{center.name}</div>
      <div>
      <KakaoMap latitude={center.latitude} longitude={center.longitude} />
      </div>
      <div className="text-lg mt-3">주소: {center.address}</div>
    </div>
  );
};

export default CenterMap;