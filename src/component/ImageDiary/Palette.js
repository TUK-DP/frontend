import React from "react";
import Color from "./Color";

const Palette = ({}) => {
  const colors = [
    [
      "#FF0000",
      "#FF4C00",
      "#FFE500",
      "#11D800",
      "#010BFF",
      "#0D009F",
      "#9902F5",
      "#FF00B8",
      "#000000",
      "#C3C2C2",
      "#550D0D",
    ],
    [
      "#FF4E4E",
      "#FF7A50",
      "#FFF067",
      "#B1ED64",
      "#637BFB",
      "#4A59A6",
      "#B770FF",
      "#FF6ADE",
      "#575757",
      "#E6E6E6",
      "#2C5602",
    ],
    [
      "#FFBEBE",
      "#FFAF9D",
      "#FFF48E",
      "#B1FF8D",
      "#9CACFF",
      "#7B82A7",
      "#D3B0FF",
      "#FFA0FB",
      "#A1A1A1",
      "#FFFFFF",
      "#440462",
    ],
  ];

  return (
    <div>
      {colors.map((colors, setIndex) => (
        <div
          key={setIndex}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "5px",
          }}
        >
          {colors.map((c, index) => (
            <Color key={index} color={c} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Palette;
