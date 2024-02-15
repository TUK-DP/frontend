import React from "react";

const Game5 = ({ onIconClick }) => {
  React.useEffect(() => {
    onIconClick("/game5");
  }, [onIconClick]);

  return (
    <div>
      <h1>알맞은 글자 연결 페이지</h1>
    </div>
  );
};

export default Game5;