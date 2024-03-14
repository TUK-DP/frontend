import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const Image = ({ image, initialPo }) => {
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
      position.x > 250 ||
      position.y > 250
    ) {
      alert("캔버스 안에서만 움직여주세요.");
    }
    console.log("x: ", position.x, "y: ", position.y);
  }, [position.x, position.y]);

  return (
    <Draggable
        bounds={{ top: -initialPo.y, left: -initialPo.x, right: 250 - initialPo.x, bottom: 250 - initialPo.y }}
        nodeRef={nodeRef} onDrag={(e, data) => trackPos(data)}>
      <div ref={nodeRef} style={{ width: "100px", height: "100px" }}>
        <img draggable={"false"} src={image} width="100px" height="100px" />
      </div>
    </Draggable>
  );
};

export default Image;
