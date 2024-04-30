import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const Image = ({ image, initialPo, width }) => {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({ x: initialPo.x, y: initialPo.y });

  const trackPos = (data) => {
    setPosition({
      x: initialPo.x + data.x,
      y: initialPo.y + data.y,
    });
  };

  useEffect(() => {
    if (
      position.x < 0 ||
      position.y < 0 ||
      position.x > width ||
      position.y > width
    ) {
      alert("캔버스 안에서만 움직여주세요.");
    }
    console.log("x: ", position.x, "y: ", position.y);
  }, [position.x, position.y]);

  return (
    <Draggable
      bounds={{
        top: -initialPo.y,
        left: -initialPo.x,
        right: width - initialPo.x - 100,
        bottom: width - initialPo.y - 100,
      }}
      nodeRef={nodeRef}
      onDrag={(e, data) => trackPos(data)}
    >
      <div ref={nodeRef} style={{ width: "100px", height: "100px" }}>
        <img draggable={"false"} src={image} width="100px" height="100px" />
      </div>
    </Draggable>
  );
};

export default Image;
