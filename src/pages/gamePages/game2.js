import React, { useEffect } from "react";

const Game2 = () =>{
  const baseURL=process.env.REACT_APP_GAME_BASE_URL;
  return(
    <iframe
        title="지는 가위바위보"s
        src={`${process.env.REACT_APP_GAME_BASE_URL}/LoosingRockScissorPaper/index.html`}
        style={{ width: "100%", height: "100%" }}
        scrolling="no"
      ></iframe>
  );
};

export default Game2;