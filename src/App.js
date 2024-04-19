import React, { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout.js";
import SubLayout from "./layout/SubLayout.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./component/Header.js";

function App() {
  const userInfo = useSelector((state) => state.UserInfo);
  const navigate = useNavigate();

  const isMember = () => {
    if (userInfo.userId == "") {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(userInfo);
    isMember();
  }, []);

  return (
    <div
      style={{
        height: "100%",
        paddingTop: "70px",
        position: "relative",
        margin: "0 auto",
        overflow: "auto",
      }}
    >
      <Header />
      {userInfo.userId == "" ? <SubLayout /> : <MainLayout />}
    </div>
  );
}

export default App;
