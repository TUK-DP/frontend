import React from "react";
import Color from "./Color";

const Palette = ({}) => {
  const colors = [
    "#FFFFFF",
    "#000000",
    "#FF1900",
    "#FF8C00",
    "#FFF200",
    "#A6FF00",
    "#00E6FF",
    "#008CFF",
    "#000DFF",
    "#8000FF",
    "#E500FF",
  ];
  return (
    <>
      <h2 className={"text-[#7D7D7D] pl-2 text-lg font-bold"}>
        옆으로 넘겨서 더 많은 색상을 볼 수 있어요!
      </h2>
      <div className={"flex flex-row overflow-x-auto gap-2"}>
        {colors.map((item, idx) => (
          <Color key={idx} color={item} />
        ))}
      </div>
    </>
  );
};

export default Palette;
