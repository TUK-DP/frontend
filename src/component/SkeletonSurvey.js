import React from "react";
import "../styles/Skeleton.css";

const SkeletonSurvey = () => {
  return (
    <div className="rounded-3xl mt-7 w-full">
      <div style={{height:"6rem", marginBottom:"1.5rem"}}></div>
      <div className="skeletonText skeleton" style={{height:"7.5rem", width:"100%"}}></div>
      <div className="flex justify-between">
        <div className="skeletonBox skeleton"></div>
        <div className="skeletonBox skeleton"></div>
      </div>
    </div>
  );
};

export default SkeletonSurvey;