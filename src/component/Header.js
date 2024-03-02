import backBtn from "../assets/backBtn.png";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({}) => {
  const location = useLocation();
  const [pageName, setPageName] = useState("Re-Memory");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    // 여기에서 URL을 가져와서 페이지 이름 설정
    const currentUrl = location.pathname;

    if (currentUrl === "/") {
      setPageName("Re-Memory");
    } else if (currentUrl === "/games") {
      setPageName("게임 선택화면");
    } else if (currentUrl === "/diary") {
      setPageName("그림일기");
    } else if (currentUrl === "/game1") {
      setPageName("이모티콘 찾기");
    } else if (currentUrl === "/game2") {
      setPageName("지는 가위바위보");
    } else if (currentUrl === "/game3") {
      setPageName("컬러매치");
    } else if (currentUrl === "/game4") {
      setPageName("순서대로 터치");
    } else if (currentUrl === "/game5") {
      setPageName("알맞은 글자 연결");
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
        <img src={backBtn} style={{ marginLeft: "15px", marginRight:"-45px"}} onClick={goBack} />
      )}
      <div
        style={{
          fontSize: "25px",
          flexGrow: "1",
          textAlign: "center",
          //marginRight: "40px",
        }}
      >
        {pageName}
      </div>
    </div>
  );
};

export default Header;
