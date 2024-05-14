import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
const Image2 = ({ image, initialPo, selected, changeSelected, index }) => {
  const [position, setPosition] = useState({ x: initialPo.x, y: initialPo.y });
  const handleClick = () => {
    changeSelected(index);
  };

  const handleStyles =
    selected == index
      ? {
          bottomLeft: {
            width: "10px",
            height: "10px",
            border: "0.5px solid #777777",
            left: "0px",
            bottom: "0px",
          },
          bottomRight: {
            width: "10px",
            height: "10px",
            border: "0.5px solid #777777",
            right: "0px",
            bottom: "0px",
          },
          topLeft: {
            width: "10px",
            height: "10px",
            border: "0.5px solid #777777",
            left: "0px",
            top: "0px",
          },
          topRight: {
            width: "10px",
            height: "10px",
            border: "0.5px solid #777777",
            right: "0px",
            top: "0px",
          },
        }
      : {};
  return (
    <div style={{ padding: "5px" }}>
      <Rnd
        default={{
          x: initialPo.x,
          y: initialPo.y,
          width: 100,
          height: 100,
        }}
        minWidth={50}
        minHeight={50}
        bounds="#limit"
        resizeHandleStyles={handleStyles}
        lockAspectRatio={true}
      >
        <img
          src={image}
          onClick={() => {
            handleClick(index);
          }}
          onTouchStart={() => {
            handleClick(index);
          }}
        />
      </Rnd>
    </div>
  );
};

export default Image2;
