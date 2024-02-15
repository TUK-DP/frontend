import React from "react";

const Game1 = ({ onIconClick }) => {
  React.useEffect(() => {
    onIconClick("/game1");
  }, [onIconClick]);

  return (
    <div>
      <h1>이모티콘 찾기 페이지</h1>
    </div>
  );
};

export default Game1;