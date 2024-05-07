import React from "react";
import { useNavigate } from "react-router-dom";

const DementiaList = ({ centers }) => {
  const navigate = useNavigate();

  const handlesubmit = (index) => {
    navigate("/centermap", { state: { centers, index } });
  };

  return (
    <div>
      {centers.map((center, index) => (
        <div key={index} className="flex flex-col px-2.5 py-2 gap-2.5 border-b-2 border-neutral-300 text-lg mb-3" onClick={() => handlesubmit(index)}>
          <div className="flex justify-between">
            <div className="text-[#82AAE3]">{center.name}</div>
            <div className={"font-semibold"}>{center.distance.toFixed(1)}km</div>
          </div>
          <div className={"flex flex-row gap-5"}>
            <div>{center.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DementiaList;