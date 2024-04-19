import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";

const Game5 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "알맞은 글자 연결" });
  }, []);
  const baseURL = process.env.REACT_APP_GAME_BASE_URL;

  return (
    <iframe
      title="알맞은 글자 연결"
      src={`${process.env.REACT_APP_GAME_BASE_URL}/TextMatch/index.html`}
      style={{ width: "100%", height: "100%" }}
      scrolling="no"
    ></iframe>
  );
};

export default Game5;
