import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CenterComp = ({ center, index }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/centermap", { state: { center } });
  };

  return (
    <div
      key={index}
      className="flex-col px-2.5 py-2 border-b-2 border-neutral-300 text-lg"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className={`text-REMEMORY`}>{center.name}</div>
        <div className={"font-semibold"}>{center.distance.toFixed(1)}km</div>
      </div>
      <div className={"flex flex-row gap-5"}>
        <div>{center.address}</div>
      </div>
    </div>
  );
};

const NoneCentersComp = ({ centers }) => {
  if (centers && centers.length > 0) return;
  return (
    <div className={"text-center mt-4"}>
      {!centers ? "치매 센터를 검색해 주세요" : "검색 결과가 없습니다"}
    </div>
  );
};

const DementiaList = ({ centers }) => {
  return (
    <div className={"flex-1 overflow-scroll"}>
      <NoneCentersComp centers={centers} />
      {/* 치매센터 리스트 */}
      {centers &&
        centers.map((center, index) => (
          <CenterComp key={index} center={center} index={index} />
        ))}
    </div>
  );
};
export default DementiaList;
