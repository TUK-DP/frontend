import React from "react";
import { useSetRecoilState } from "recoil";
import { selectedColorState } from "../../recoil/canvasState";

const Color = ({ color }) => {
  const borderColor = color === "#FFFFFF" ? "1px solid black" : "none";
  const setSelectedColor = useSetRecoilState(selectedColorState);
  return (
    <div
      className={"w-14 h-14 rounded-full flex-shrink-0"}
      style={{
        backgroundColor: color,
        border: borderColor,
      }}
      onClick={() => setSelectedColor(color)}
    ></div>
  );
};

export default Color;
