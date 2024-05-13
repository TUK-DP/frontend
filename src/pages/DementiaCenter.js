import React from "react";
import Search from "../assets/search.png";
import { useGetNearByCenter } from "../hooks/useGetNearByCenter";
import DementiaList from "../component/DementiaList";

const InputComp = ({ loading, value, onChange }) => {
  return (
    <input
      disabled={loading}
      className="border-none flex-1"
      placeholder={
        loading
          ? "위치 정보를 가져오는 중입니다..."
          : "거리(km)를 입력해주세요."
      }
      type={"number"}
      value={value}
      onChange={onChange}
    />
  );
};

const SearchIcon = ({ onClick, loading }) => {
  if (loading) {
    return (
      <div className={"h-9 w-9"}>
        <div
          className={`animate-spin rounded-full h-9 w-9 border-4 border-REMEMORY border-b-white`}
        />
      </div>
    );
  }
  return (
    <img
      src={Search}
      className={"h-9 w-9 cursor-pointer"}
      onClick={onClick}
      alt={""}
    />
  );
};

const SearchBar = ({
  value,
  isPositionFetchingDone,
  isCenterDataFetchingDone,
  onRadiusChange,
  onSearch,
}) => {
  return (
    <div className="flex items-center w-auto h-12 px-2.5 border-[1px] rounded-2xl border-black">
      <InputComp
        loading={!isPositionFetchingDone}
        value={value}
        onChange={onRadiusChange}
      />
      <SearchIcon onClick={onSearch} loading={!isCenterDataFetchingDone} />
    </div>
  );
};

const DementiaCenter = () => {
  let {
    isPositionFetchingDone,
    isCenterDataFetchingDone,
    inputRadius,
    onRadiusChange,
    centers,
    fetchNearbyCenters,
  } = useGetNearByCenter({ latitude: "", longitude: "" });

  return (
    <div id={"cos"} className={"flex flex-col h-[99%] px-2.5 pt-5"}>
      {/* 검색바 */}
      <SearchBar
        value={inputRadius}
        isPositionFetchingDone={isPositionFetchingDone}
        isCenterDataFetchingDone={isCenterDataFetchingDone}
        onSearch={fetchNearbyCenters}
        onRadiusChange={onRadiusChange}
      />

      {/* 치매센터리스트 */}
      <DementiaList centers={centers} />
    </div>
  );
};

export default DementiaCenter;
