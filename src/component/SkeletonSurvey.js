import React from "react";

const SkeletonSurvey = () => {
  const dummyQuestions = Array.from({ length: 32 }, (_, index) => index + 1);

  return (
    <div>
      {dummyQuestions.map((questionIndex) => (
        <div key={questionIndex}>
          <div className="bg-[#ddd] my-10 p-4 rounded-3xl">
            <div className="bg-[#c6c6c6] h-6 rounded-3xl mb-3"></div>
            <div className="bg-[#c6c6c6] h-6 rounded-3xl mb-4"></div>
            <div>
              <div className="h-14 p-4 mb-4 rounded-3xl space-y-3 bg-[#c6c6c6]"></div>
              <div className="h-14 p-4 rounded-3xl space-y-3 bg-[#c6c6c6]"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonSurvey;