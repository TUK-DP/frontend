import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
import MoveableHelper from "moveable-helper";
import "../../styles/Moveable.css";

const Image = ({
  image,
  initialPo,
  width,
  selected,
  index,
  changeSelected,
  limit,
}) => {
  const targetRef = useRef(null);
  const [helper] = useState(() => {
    return new MoveableHelper();
  });
  const handleClick = () => {
    changeSelected(index);
  };

  return (
    <div
      onClick={() => {
        handleClick(index);
      }}
    >
      <div className="target" ref={targetRef}>
        <img src={image} width={100} height={100} />
      </div>
      {selected === index ? (
        <Moveable
          target={targetRef}
          draggable={true}
          scalable={true}
          keepRatio={true}
          rotatable={true}
          onDragStart={helper.onDragStart}
          onDrag={helper.onDrag}
          onScaleStart={helper.onScaleStart}
          onScale={helper.onScale}
          onRotateStart={helper.onRotateStart}
          onRotate={helper.onRotate}
        />
      ) : null}
    </div>
  );
};

export default Image;
