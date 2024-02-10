import React, { useState } from "react";
import Header from "./component/Header.js";
import Navbar from "./component/Navbar.js";
import Home from "./pages/Home.js";
import Games from "./pages/Games.js";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleIconClick = (page) => {
    setCurrentPage(page);
  };

  const getPageName = () => {
    switch (currentPage) {
      case "home":
        return "Re-Memory";
      case "games":
        return "게임 선택화면";
      default:
        return "Re-Memory";
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "games":
        return <Games />;
      default:
        return <Home />;
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
      <div className="content">{renderContent()}</div>
      <Navbar onIconClick={handleIconClick} />
    </div>
  );
}

export default App;
