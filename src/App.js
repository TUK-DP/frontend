import React from "react";
import MainLayout from "./layout/MainLayout.js";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Calendar from "./pages/Calendar";
import PhotoEdit from "./pages/PhotoEdit";
import DiaryImageShow from "./pages/DiaryImageShow";
import Draw from "./pages/Draw";
import Game1 from "./pages/gamePages/game1";
import Game2 from "./pages/gamePages/game2";
import Game3 from "./pages/gamePages/game3";
import Game4 from "./pages/gamePages/game4";
import Game5 from "./pages/gamePages/game5";
import DiaryTest from "./pages/DiaryTest";
import DiaryTestSubmit from "./pages/DiaryTestSubmit";
import DiaryTestResult from "./pages/DiaryTestResult";
import Survey from "./pages/Survey";
import SurveyStart from "./pages/SurveyStart";
import DementiaCenter from "./pages/DementiaCenter";
import DiaryWrite from "./pages/DiaryWrite";
import Error from "./pages/Error";
import Surveyresult from "./pages/SurveyResult";
import BeforeGame from "./pages/gamePages/BeforeGame";
import Gymnastics from "./pages/Gymnastics";
import GymnasticsVideo from "./pages/GymnasticsVideo";
import MyPage from "./pages/MyPage";
import CenterMap from "./pages/CenterMap";
import PrevSurveyResult from "./pages/PrevSurveyResult";
import SurveyError from "./pages/SurveyError";
import Header from "./component/Header";
import SubLayout from "./layout/SubLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAutoLogin from "./hooks/useAutoLogin";
import Explain from "./pages/Explain.js";
import Keyword from "./pages/Keyword.js";

function App() {
  let { loading } = useAutoLogin();
  if (loading) return null;
  return (
    <div className={"h-full"}>
      <Header />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route exact path={"/calendar"} element={<Calendar />} />
          <Route exact path={"/photoedit"} element={<PhotoEdit />} />
          <Route exact path={"/diary/show"} element={<DiaryImageShow />} />
          <Route exact path={"/draw"} element={<Draw />} />
          <Route exact path={"/games"} element={<Games />} />
          <Route exact path={"/game1"} element={<Game1 />} />
          <Route exact path={"/game2"} element={<Game2 />} />
          <Route exact path={"/game3"} element={<Game3 />} />
          <Route exact path={"/game4"} element={<Game4 />} />
          <Route exact path={"/game5"} element={<Game5 />} />
          <Route exact path={"/diary/test"} element={<DiaryTest />} />
          <Route
            exact
            path={"/diary/test/submit"}
            element={<DiaryTestSubmit />}
          />
          <Route
            exact
            path={"/diary/test/result"}
            element={<DiaryTestResult />}
          />
          <Route exact path={"/survey"} element={<Survey />} />
          <Route exact path={"/surveyStart"} element={<SurveyStart />} />
          <Route exact path={"/dementiacenter"} element={<DementiaCenter />} />
          <Route exact path={"/diarywrite"} element={<DiaryWrite />} />
          <Route exact path={"/error"} element={<Error />} />
          <Route exact path={"/surveyresult"} element={<Surveyresult />} />
          <Route exact path={"/beforegame"} element={<BeforeGame />} />
          <Route exact path={"/gymnastics"} element={<Gymnastics />} />
          <Route exact path={"/gymvideo"} element={<GymnasticsVideo />} />
          <Route exact path={"/mypage"} element={<MyPage />} />
          <Route exact path={"/centermap"} element={<CenterMap />} />
          <Route exact path={"/explain"} element={<Explain />} />
          <Route exact path={"/keyword"} element={<Keyword />} />
          <Route
            exact
            path={"/prevsurveyresult"}
            element={<PrevSurveyResult />}
          />
          <Route exact path={"/surveyerror"} element={<SurveyError />} />
        </Route>
        <Route element={<SubLayout />}>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
