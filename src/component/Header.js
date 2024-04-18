import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const Header = ({}) => {
  const location = useLocation();
  const [pageName, setPageName] = useState("Re-Memory");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [currentUrl, setCurrentUrl] = useState();
  useEffect(() => {
    const currentUrl = location.pathname;
    let name = "Re-Memory";
    switch (currentUrl) {
      case "/games":
        name = "게임 선택화면";
        break;
      case "/game1":
        name = "이모티콘 찾기";
        break;
      case "/game2":
        name = "지는 가위바위보";
        break;
      case "/game3":
        name = "컬러매치";
        break;
      case "/game4":
        name = "순서대로 터치";
        break;
      case "/game5":
        name = "알맞은 글자 연결";
        break;
      case "/diary/test":
        name = "일기회상";
        break;
      case "/draw":
        name = "그림일기";
        break;
      case "/diary/test/submit":
        name = "제출 결과";
        break;
      case "/login":
        name = "로그인";
        break;
      case "/signup":
        name = "회원가입";
        break;
      case "/survey":
      case "/surveyStart":
        name = "치매진단";
        break;
      case "/diarywrite":
        name = "일기작성";
        break;
      case "/calendar":
        name = "캘린더";
        break;
      case "/gymnastics":
      case "/gymvideo":
        name = "체조영상";
        break;
      case "/mypage":
        name = "마이페이지";
        break;
      default:
        break;
    }
    setPageName(name);
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
      {pageName !== "Re-Memory" && pageName !== "로그인" && (
        <IoIosArrowRoundBack
          size={60}
          className={"z-10 ml-4"}
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
      {pageName !== "Re-Memory" && pageName !== "로그인" && (
        <div style={{ width: "75px" }}></div>
      )}
    </div>
  );
};

export default Header;
