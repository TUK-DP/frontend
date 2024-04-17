import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../component/Header";

const SubLayout = () => {
  return (
    <div style={{ height: "100%" }}>
      <Header />
      <div
        style={{
          height: "100%",
          paddingTop: "70px",
          position: "relative",
          margin: "0 auto",
          overflow: "auto",
        }}
      >
        <Routes>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default SubLayout;
