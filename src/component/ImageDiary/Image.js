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
    const onDrag = ({
                        target,
                        beforeDelta, beforeDist,
                        left, top,
                        right, bottom,
                        delta, dist,
                        transform,
                        clientX, clientY,
                    }) => {

        if (left < 0) {
            left = 0;
        }

        if (top < 0) {
            top = 0;
        }

        target.style.transform = `translate(${left}px, ${top}px) rotate(0deg) scale(1,1)`;
    };

  return (
    <div
      onClick={() => {
        handleClick(index);
      }}
    >
      <img
        src={image}
        width={100}
        height={100}
        className="target"
        ref={targetRef}
      />
      {selected === index ? (
        <Moveable
          target={targetRef}
          draggable={true}
          scalable={true}
          keepRatio={true}
          rotatable={true}
          onDragStart={helper.onDragStart}
          onDrag={onDrag}
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
