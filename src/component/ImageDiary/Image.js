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
}) => {
  const targetRef = useRef(null);
  const [helper] = useState(() => {
    return new MoveableHelper();
  });
  const handleClick = () => {
    changeSelected(index); // 전달받은 onClick 함수를 호출하여 이미지의 인덱스를 전달
  };

  // const [position, setPosition] = useState({ x: initialPo.x, y: initialPo.y });

  // const trackPos = (data) => {
  //   setPosition({
  //     x: initialPo.x + data.x,
  //     y: initialPo.y + data.y,
  //   });
  // };

  // useEffect(() => {
  //   if (
  //     position.x < 0 ||
  //     position.y < 0 ||
  //     position.x > width ||
  //     position.y > width
  //   ) {
  //     alert("캔버스 안에서만 움직여주세요.");
  //   }
  //   console.log("x: ", position.x, "y: ", position.y);
  // }, [position.x, position.y]);

  return (
    // <Draggable
    //   bounds={{
    //     top: -initialPo.y,
    //     left: -initialPo.x,
    //     right: width - initialPo.x - 100,
    //     bottom: width - initialPo.y - 100,
    //   }}
    //   nodeRef={nodeRef}
    //   onDrag={(e, data) => trackPos(data)}
    // >
    //   <div ref={nodeRef} style={{ width: "100px", height: "100px" }}>
    //     <img draggable={"false"} src={image} width="100px" height="100px" />
    //   </div>
    // </Draggable>
    <div
      onClick={() => {
        handleClick(index);
      }}
      onTouch
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
