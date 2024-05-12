import React from "react";
import Graphs from "../component/Graphs";
import { useLocation, useNavigate } from "react-router-dom";

const Keyword = () => {
  const location = useLocation();
  const diaryId = location.state.diaryId;
  return(
    <div className="w-full h-full">
      <Graphs diaryId={diaryId}/>
    </div>
  )
}

export default Keyword; 