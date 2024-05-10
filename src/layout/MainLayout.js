import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import Home from "../pages/Home";
import Games from "../pages/Games";
import Calendar from "../pages/Calendar";
import PhotoEdit from "../pages/PhotoEdit";
import Draw from "../pages/Draw";
import Game1 from "../pages/gamePages/game1";
import Game2 from "../pages/gamePages/game2";
import Game3 from "../pages/gamePages/game3";
import Game4 from "../pages/gamePages/game4";
import Game5 from "../pages/gamePages/game5";
import DiaryTest from "../pages/DiaryTest";
import DiaryTestSubmit from "../pages/DiaryTestSubmit";
import DiaryTestResult from "../pages/DiaryTestResult";
import Survey from "../pages/Survey";
import SurveyStart from "../pages/SurveyStart";
import DementiaCenter from "../pages/DementiaCenter";
import Surveyresult from "../pages/SurveyResult";
import BeforeGame from "../pages/gamePages/BeforeGame";
import Gymnastics from "../pages/Gymnastics";
import GymnasticsVideo from "../pages/GymnasticsVideo";
import MyPage from "../pages/MyPage";
import DiaryImageShow from "../pages/DiaryImageShow";
import DiaryWrite from "../pages/DiaryWrite";
import Error from "../pages/Error";
import Header from "../component/Header";
import CenterMap from "../pages/CenterMap";
import PrevSurveyResult from "../pages/PrevSurveyResult";
import SurveyError from "../pages/SurveyError";

const MainLayout = () => {
  const location = useLocation();
  const div = useRef();

  useEffect(() => {
    div.current.scrollTo(0, 0);
  }, [location.pathname]);

  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
  });
  return (
    <div
      style={{
        height: "100%",
        paddingTop: "70px",
        paddingBottom: "92px",
        overflow: "auto",
      }}
      ref={div}
    >
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/games"} element={<Games />} />
        <Route path={"/calendar"} element={<Calendar />} />
        <Route path={"/photoedit"} element={<PhotoEdit />} />
        <Route path={"/diary/show"} element={<DiaryImageShow />} />
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
        <Route path={"/dementiacenter"} element={<DementiaCenter />} />
        <Route path={"/diarywrite"} element={<DiaryWrite />} />
        <Route path={"/error"} element={<Error />} />
        <Route path={"/surveyresult"} element={<Surveyresult />} />
        <Route path={"/beforegame"} element={<BeforeGame />} />
        <Route path={"/gymnastics"} element={<Gymnastics />} />
        <Route path={"/gymvideo"} element={<GymnasticsVideo />} />
        <Route path={"/mypage"} element={<MyPage />} />
        <Route path={"/centermap"} element={<CenterMap />} />
        <Route path={"/prevsurveyresult"} element={<PrevSurveyResult/>} />
        <Route path={"/surveyerror"} element={<SurveyError/>} />
      </Routes>
      <Navbar />
    </div>
  );
};

export default MainLayout;
