import React from "react";
import { useLocation } from "react-router-dom";

const CenterMap = () => {
  const location = useLocation();
  const { centers, index } = location.state;
  const center = centers[index];

  return (
    <div>
      <div>
        <p>치매 센터 이름: {center.name}</p>
        <p>거리: {center.distance.toFixed(1)}km</p>
        <p>주소: {center.address}</p>
      </div>
    </div>
  );
};

export default CenterMap;