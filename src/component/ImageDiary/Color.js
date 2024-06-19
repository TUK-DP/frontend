import React from "react";
import { connect, useDispatch } from "react-redux";
import { SELECT_COLOR } from "../../redux/modules/ImageDiary";

const Color = ({ color }) => {
  const dispatch = useDispatch();
  // const selectedcolor = useSelector((state) => state.ImageDiary.selectedColor);
  const borderColor = color === "#FFFFFF" ? "1px solid black" : "none";
  return (
    <div
      className={"w-14 h-14 rounded-full flex-shrink-0"}
      style={{
        backgroundColor: color,
        border: borderColor,
      }}
      onClick={() => dispatch({ type: SELECT_COLOR, selectedColor: color })}
    ></div>
  );
};

export default Color;
