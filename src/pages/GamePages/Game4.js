import React from "react";

const Game4 = ({ onIconClick }) => {
  React.useEffect(() => {
    onIconClick("/game4");
  }, [onIconClick]);

  return (
    <div>
      <h1>순서대로 터치 페이지</h1>
    </div>
  );
};

export default Game4;