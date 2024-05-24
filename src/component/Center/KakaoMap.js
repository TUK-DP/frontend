import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ latitude, longitude }) => {
  return (
    <div>
      <Map
        center={{ lat: latitude, lng: longitude }}
        style={{ width: '100%', height: '25rem' }}
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </div>
  );
};

export default KakaoMap;
