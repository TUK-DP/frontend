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
    } else if (currentUrl === "/diary/test") {
      setPageName("일기회상");
    } else if (currentUrl === "/draw") {
      setPageName("그림일기");
    } else if (currentUrl === "/diary/test/submit") {
      setPageName("제출 결과");
    } else if (currentUrl === "/login") {
      setPageName("로그인");
    } else if (currentUrl === "/signup") {
      setPageName("회원가입");
    } else if (currentUrl === "/survey") {
      setPageName("치매진단");
    } else if (currentUrl === "/surveyStart") {
      setPageName("치매진단");
    } else if (currentUrl === "/diarywrite") {
      setPageName("일기작성");
    } else if (currentUrl === "/calendar") {
      setPageName("캘린더");
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        right: "0px",
        margin: "0px auto",
        minWidth: "360px",
        maxWidth: "420px",
        width: "100%",
        height: "70px",
        zIndex: "40",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: "0 4px 2px -2px #D9D9D9",
      }}
    >
      {pageName !== "Re-Memory" && (
        <img
          src={backBtn}
          style={{ marginLeft: "15px", marginRight: "-50px", zIndex: "2" }}
          onClick={goBack}
        />
      )}
      <div
        style={{
          fontSize: "25px",
          flexGrow: "1",
          textAlign: "center",
        }}
      >
        {pageName}
      </div>
    </div>
  );
};

export default Header;
