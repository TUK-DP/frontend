import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUrl } from "./redux/modules/urlSave.js";
import Draw from "./pages/Draw";
import PhotoEdit from "./pages/PhotoEdit";
import React, { useEffect } from "react";
import Header from "./component/Header.js";
import Navbar from "./component/Navbar.js";
import Home from "./pages/Home.js";
import Games from "./pages/Games.js";
import DiaryShow from "./pages/DiaryShow.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Calendar from "./pages/Calendar.js";
import Diary from "./pages/Diary.js";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(saveUrl(location.pathname));
  }, [dispatch, location.pathname]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minHeight: "852px",
        maxHeight: "852px",
        width: "100vw",
        maxWidth: "393px",
        minWidth: "393px",
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
        }}
      >
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/games"} element={<Games />} />
          <Route path={"/calendar"} element={<Calendar />} />
          <Route path={"/photoedit"} element={<PhotoEdit />} />
          <Route path={"/diary/show"} element={<DiaryShow />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/diarywrite"} element={<Diary />} />
          <Route path={"/draw"} element={<Draw />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
