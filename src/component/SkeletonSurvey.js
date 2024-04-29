import React from "react";
import "../styles/Skeleton.css";
import Shimmer from "./Shimmer";

const SkeletonSurvey = () => {
  const dummyQuestions = Array.from({ length: 32 }, (_, index) => index + 1);

  return (
    <div>
      {dummyQuestions.map((questionIndex) => (
        <div key={questionIndex}>
          <div className="bg-[#ddd] my-10 pt-4 px-4 pb-1 rounded-3xl">
            <div className="skeletonText"><Shimmer /></div>
            <div className="skeletonText"><Shimmer /></div>
            <div>
              <div className="skeletonBox"><Shimmer /></div>
              <div className="skeletonBox"><Shimmer /></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonSurvey;