import React from "react";
import { connect } from "react-redux";
import { selectColor } from "../../redux/modules/ImageDiary";

const Color = ({ color, dispatch }) => {
  const borderColor = color === "#FFFFFF" ? "1px solid black" : "none";
  return (
    <div
      style={{
        width: "55px",
        height: "50px",
        backgroundColor: color,
        border: borderColor,
      }}
      onClick={() => dispatch(selectColor(color))}
    ></div>
  );
};

const mapStateToProps = (state) => ({
  selectedColor: state.selectedColor,
});

export default connect(mapStateToProps)(Color);
