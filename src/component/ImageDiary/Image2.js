import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
const Image2 = ({ image, initialPo, selected, changeSelected, index }) => {
  // const nodeRef = useRef(null);
  // const [position, setPosition] = useState({ x: initialPo.x, y: initialPo.y });
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
          },
          bottomRight: {
            width: "10px",
            height: "10px",
            border: "0.5px solid #777777",
          },
          topLeft: {
            width: "10px",
            height: "10px",
            border: "0.5px solid #777777",
          },
          topRight: {
            width: "10px",
            height: "10px",
            border: "0.5px solid #777777",
          },
        }
      : {};
  return (
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
  );
};

export default Image2;
