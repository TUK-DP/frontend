import React, { useState } from "react";
import { Rnd } from "react-rnd";

const Image = ({ image, isSelected, onSelect }) => {
  const [size, setSize] = useState({
    width: image.width,
    height: image.height,
  });
  const [position, setPosition] = useState({ x: 10, y: 10 });

  const handleDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
  };

  const handleResizeStop = (e, direction, ref, delta, newPosition) => {
    setSize({
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
    });
    setPosition(newPosition);
  };

  const borderStyle = isSelected ? "2px solid #D9D9D9" : "none";

  return (
    <Rnd
      style={{
        border: borderStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      size={size}
      position={position}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minWidth="50px"
      maxWidth="500px"
      minHeight="50px"
      maxHeight="500px"
      onClick={onSelect}
    >
      <img
        src={image}
        alt="diary-image"
        style={{ width: "100%", height: "100%" }}
      />
    </Rnd>
  );
};

export default Image;
