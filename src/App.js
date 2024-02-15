import "./App.css";
import { Route, Routes } from "react-router-dom";
import Draw from "./pages/Draw";
import PhotoEdit from "./pages/PhotoEdit";
import React, { useState } from "react";
import Header from "./component/Header.js";
import Navbar from "./component/Navbar.js";
import Home from "./pages/Home.js";
import Games from "./pages/Games.js";
import DiaryShow from "./pages/DiaryShow.js";
import Game1 from "./pages/GamePages/Game1.js";
import Game2 from "./pages/GamePages/Game2.js";
import Game3 from "./pages/GamePages/Game3.js";
import Game4 from "./pages/GamePages/Game4.js";
import Game5 from "./pages/GamePages/Game5.js";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  // 페이지를 최상단으로 스크롤
  window.scrollTo(0, 0);

  const handleIconClick = (page) => {
    setCurrentPage(page);
  };

  const getPageName = () => {
    switch (currentPage) {
      case "/":
        return "Re-Memory";
      case "/games":
        return "게임 선택화면";
      case "/diary": //나중에 일기장으로 변경
        return "그림일기";
      case "/game1":
        return "이모티콘 찾기";
      case "/game2":
        return "지는 가위바위보";
      case "/game3":
        return "컬러매치";
      case "/game4":
        return "순서대로 터치";
      case "/game5":
        return "알맞은 글자 연결";  
      default:
        return "Re-Memory";
    }
  };
  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header pageName={getPageName()} />
      <Routes className="content">
        <Route path={"/"} element={<Home />} />
        <Route path={"/games"} element={<Games />} />
        <Route path={"/diary"} element={<Draw />} />
        <Route path={"/photoedit"} element={<PhotoEdit />} />
        <Route path={"/diary/show"} element={<DiaryShow />} />
        <Route path={"/game1"} element={<Game1 onIconClick={handleIconClick} />} />
        <Route path={"/game2"} element={<Game2 onIconClick={handleIconClick} />} />
        <Route path={"/game3"} element={<Game3 onIconClick={handleIconClick} />} />
        <Route path={"/game4"} element={<Game4 onIconClick={handleIconClick} />} />
        <Route path={"/game5"} element={<Game5 onIconClick={handleIconClick} />} />
      </Routes>
      <Navbar onIconClick={handleIconClick} />
    </div>
  );
}

export default App;