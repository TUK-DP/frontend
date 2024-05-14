import React, { useEffect } from "react";
import Graphs from "../component/Graphs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";

const Keyword = () => {
  const location = useLocation();
  const diaryId = location.state.diaryId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "키워드 그래프" });
  }, []);
  return(
    <div className="w-full h-full">
      <div className="text-2xl font-bold flex justify-center pt-4">자유롭게 움직여주세요.</div>
      <Graphs diaryId={diaryId}/>
    </div>
  )
}

export default Keyword; 