import React from "react";
import Color from "./Color";

const Palette = ({}) => {
  const colors = [
    ["#FF0000", "#FF00B8", "#FF4C00", "#FFE500", "#11D800", "#9902F5"],
    ["#010BFF", "#0D009F", "#550D0D", "#A1A1A1", "#FFFFFF", "#000000"],
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
