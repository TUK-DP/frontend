import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const pageName = useSelector((state) => state.PageName.pageName);

  useEffect(() => {
    console.log(pageName);
  }, [pageName]);

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
