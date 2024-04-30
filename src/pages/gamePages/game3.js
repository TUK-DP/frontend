import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";

const Game3 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "컬러매치" });
  }, []);
  const baseURL = process.env.REACT_APP_GAME_BASE_URL;

  return (
    <iframe
      title="컬러매치"
      src={`${process.env.REACT_APP_GAME_BASE_URL}/ColorMatch/index.html`}
      style={{ width: "100%", height: "100%" }}
      scrolling="no"
    ></iframe>
  );
};

export default Game3;
