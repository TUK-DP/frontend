import { Route, Routes } from "react-router-dom";
import Draw from "./pages/Draw";
import PhotoEdit from "./pages/PhotoEdit";
import React, { useState } from "react";
import Header from "./component/Header.js";
import Navbar from "./component/Navbar.js";
import Home from "./pages/Home.js";
import Games from "./pages/Games.js";
import DiaryShow from "./pages/DiaryShow.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
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
      default:
        return "Re-Memory";
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minHeight: "852px",
        maxHeight: "852px",
        width: "100vw",
        maxWidth: "393px",
        minWidth: "393px",
      }}
    >
      <Header pageName={getPageName()} />
      <div
        style={{
          flex: 1,
        }}
      >
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/games"} element={<Games />} />
          <Route path={"/diary"} element={<Draw />} />
          <Route path={"/photoedit"} element={<PhotoEdit />} />
          <Route path={"/diary/show"} element={<DiaryShow />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
        </Routes>
      </div>
      <Navbar onIconClick={handleIconClick} />
    </div>
  );
}

export default App;
