import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const SubLayout = () => {
  return (
    <div style={{ height: "100%" }}>
      <Routes>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/signup"} element={<Signup />}></Route>
      </Routes>
    </div>
  );
};

export default SubLayout;
