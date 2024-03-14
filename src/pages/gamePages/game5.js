import React from "react";

const Game5 = () =>{
  const baseURL=process.env.REACT_APP_GAME_BASE_URL;

  return(
    <iframe
        title="알맞은 글자 연결"
        src={`${process.env.REACT_APP_GAME_BASE_URL}/TextMatch/index.html`}
        style={{ width: "100%", height: "100%" }}
        scrolling="no"
      ></iframe>
  );
};

export default Game5;