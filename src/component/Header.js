import backBtn from "../assets/backBtn.png";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = ({}) => {
  const location = useLocation();
  const [pageName, setPageName] = useState("Re-Memory");
  useEffect(() => {
    // 여기에서 URL을 가져와서 페이지 이름 설정
    const currentUrl = location.pathname;

    if (currentUrl === "/") {
      setPageName("Re-Memory");
    } else if (currentUrl === "/games") {
      setPageName("게임 선택화면");
    } else if (currentUrl === "/diary") {
      setPageName("그림일기");
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        minWidth: "393px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: "0 4px 2px -2px #D9D9D9",
        // height: "70px",
        backgroundColor: "white",
        position: "sticky",
        top: "0",
        padding: "20px 0px",
      }}
    >
      {pageName !== "Re-Memory" && (
        <img src={backBtn} style={{ marginLeft: "15px" }} />
      )}
      <div
        style={{
          fontSize: "25px",
          flexGrow: "1",
          textAlign: "center",
          marginRight: "40px",
        }}
      >
        {pageName}
      </div>
    </div>
  );
};

export default Header;
