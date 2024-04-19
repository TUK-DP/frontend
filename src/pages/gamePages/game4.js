import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";

const Game4 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "순서대로 터치" });
  }, []);
  return <div>Game4 page</div>;
};

export default Game4;
