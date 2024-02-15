import React from "react";

const Game3 = ({ onIconClick }) => {
  React.useEffect(() => {
    onIconClick("/game3");
  }, [onIconClick]);

  return (
    <div>
      <h1>컬러매치 페이지</h1>
    </div>
  );
};

export default Game3;