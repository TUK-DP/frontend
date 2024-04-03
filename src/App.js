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
import DiaryImageShow from "./pages/DiaryImageShow.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Calendar from "./pages/Calendar.js";
import Game1 from "./pages/gamePages/game1.js";
import Game2 from "./pages/gamePages/game2.js";
import Game3 from "./pages/gamePages/game3.js";
import Game4 from "./pages/gamePages/game4.js";
import Game5 from "./pages/gamePages/game5.js";
import DiaryTest from "./pages/DiaryTest.js";
import DiaryTestSubmit from "./pages/DiaryTestSubmit.js";
import { useLocation } from "react-router-dom";
import Survey from "./pages/Survey";
import MyPage from "./pages/MyPage.js";
import SurveyStart from "./pages/SurveyStart.js";
import DementiaCenter from "./pages/DementiaCenter.js";
import DiaryTestResult from "./pages/DiaryTestResult.js";
import DiaryWrite from "./pages/DiaryWrite.js";
import Error from "./pages/Error.js";
import Surveyresult from "./pages/SurveyResult.js";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(saveUrl(location.pathname));
  }, [dispatch, location.pathname]);

  window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
  });

  return (
    <div style={{ height: "100%" }}>
      <Header />
      <div
        style={{
          height: "100%",
          paddingTop: "70px",
          paddingBottom: "90px",
          position: "relative",
          margin: "0 auto",
          overflow: "scroll",
        }}
      >
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/games"} element={<Games />} />
          <Route path={"/calendar"} element={<Calendar />} />
          <Route path={"/photoedit"} element={<PhotoEdit />} />
          <Route path={"/diary/show"} element={<DiaryImageShow />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/draw"} element={<Draw />} />
          <Route path={"/game1"} element={<Game1 />} />
          <Route path={"/game2"} element={<Game2 />} />
          <Route path={"/game3"} element={<Game3 />} />
          <Route path={"/game4"} element={<Game4 />} />
          <Route path={"/game5"} element={<Game5 />} />
          <Route path={"/diary/test"} element={<DiaryTest />} />
          <Route path={"/diary/test/submit"} element={<DiaryTestSubmit />} />
          <Route path={"/diary/test/result"} element={<DiaryTestResult />} />
          <Route path={"/survey"} element={<Survey />} />
          <Route path={"/surveyStart"} element={<SurveyStart />} />
          <Route path={"/mypage"} element={<MyPage />} />
          <Route path={"/dementiacenter"} element={<DementiaCenter />} />
          <Route path={"/diarywrite"} element={<DiaryWrite />} />
          <Route path={"/error"} element={<Error />} />
          <Route path={"/surveyresult"} element={<Surveyresult />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
