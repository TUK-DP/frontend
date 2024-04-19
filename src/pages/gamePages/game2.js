import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";

const Game2 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "지는 가위바위보" });
  }, []);
  const baseURL = process.env.REACT_APP_GAME_BASE_URL;
  return (
    <iframe
      title="지는 가위바위보"
      s
      src={`${process.env.REACT_APP_GAME_BASE_URL}/LoosingRockScissorPaper/index.html`}
      style={{ width: "100%", height: "100%" }}
      scrolling="no"
    ></iframe>
  );
};

export default Game2;
