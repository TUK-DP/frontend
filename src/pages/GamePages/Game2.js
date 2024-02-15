import React from "react";

const Game2 = ({ onIconClick }) => {
  React.useEffect(() => {
    onIconClick("/game2");
  }, [onIconClick]);

  return (
    <div>
      <h1>지는 가위바위보 페이지</h1>
    </div>
  );
};

export default Game2;