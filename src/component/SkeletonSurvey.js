import React from "react";
import "../styles/Skeleton.css";

const SkeletonSurvey = () => {
  const dummyQuestions = Array.from({ length: 32 }, (_, index) => index + 1);
  return (
    <div>
      {dummyQuestions.map((questionIndex) => (
        <div key={questionIndex}>
          <div className="bg-[#ddd] my-10 pt-4 px-4 pb-1 rounded-3xl">
            <div className="skeletonText skeleton"></div>
            <div className="skeletonText skeleton"></div>
            <div>
              <div className="skeletonBox skeleton"></div>
              <div className="skeletonBox skeleton"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonSurvey;