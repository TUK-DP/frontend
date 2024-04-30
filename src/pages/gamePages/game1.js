import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";

const Game1 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "이모티콘 찾기" });
  }, []);
  return <div>Game1 page</div>;
};

export default Game1;
