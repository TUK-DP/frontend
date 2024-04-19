import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../component/Header";

const SubLayout = () => {
  return (
    <div style={{ paddingTop: "70px", height: "100%" }}>
      <Header />
      <Routes>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/signup"} element={<Signup />}></Route>
      </Routes>
    </div>
  );
};

export default SubLayout;
