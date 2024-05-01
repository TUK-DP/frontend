import React from "react";

const DementiaList = ({ centers }) => {
  return (
    <div>
      {centers.map((center, index) => (
        <div key={index}>
          {center.name}
          <div>
            <div>{center.distance.toFixed(1)}km</div>
            <div>{center.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DementiaList;