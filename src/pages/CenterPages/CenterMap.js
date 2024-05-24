import React from "react";
import { useLocation } from "react-router-dom";
import KakaoMap from "../../component/Center/KakaoMap";

const CenterMap = () => {
  const location = useLocation();
  const { center } = location.state;
  return (
    <>
      <div className={`text-center font-bold text-REMEMORY text-2xl my-5`}>
        {center.name}
      </div>

      <KakaoMap latitude={center.latitude} longitude={center.longitude} />

      <p className="text-center text-lg mt-3">주소: {center.address}</p>
    </>
  );
};

export default CenterMap;
