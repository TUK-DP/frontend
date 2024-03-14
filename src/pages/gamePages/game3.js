import React from "react";

const Game3 = () =>{
  const baseURL=process.env.REACT_APP_GAME_BASE_URL;

  return(
    <iframe
        title="컬러매치"
        src={`${process.env.REACT_APP_GAME_BASE_URL}/ColorMatch/index.html`}
        style={{ width: "100%", height: "100%" }}
        scrolling="no"
      ></iframe>
  );
};

export default Game3;