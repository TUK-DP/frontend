import React from "react";
import { connect } from "react-redux";
import { selectColor } from "../../redux/modules/ImageDiary";

const Color = ({ color, dispatch }) => {
  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        backgroundColor: color,
      }}
      onClick={() => dispatch(selectColor(color))}
    ></div>
  );
};

const mapStateToProps = (state) => ({
  selectedColor: state.selectedColor,
});

export default connect(mapStateToProps)(Color);
