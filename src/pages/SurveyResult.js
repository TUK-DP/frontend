import React from "react";
import Graph from "../component/Graph";
import { useLocation } from 'react-router-dom';

const Surveyresult = () => { 
  const location = useLocation();
  const count = location.state ? location.state.oCount : 0; 
  return (
    <div className="w-full">
      <div className="w-full">
        <Graph number={count} />
      </div>
    </div>
  )
}

export default Surveyresult;
