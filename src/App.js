import React from "react";
import MainLayout from "./layout/MainLayout.js";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/gamePages/Games.js";
import Calendar from "./pages/Calendar/Calendar.js";
import PhotoEdit from "./pages/Calendar/PhotoEdit.js";
import DiaryImageShow from "./pages/Calendar/DiaryImageShow.js";
import Draw from "./pages/Calendar/Draw.js";
import Game1 from "./pages/gamePages/game1";
import Game2 from "./pages/gamePages/game2";
import Game3 from "./pages/gamePages/game3";
import Game4 from "./pages/gamePages/game4";
import Game5 from "./pages/gamePages/game5";
import DiaryTest from "./pages/Test/DiaryTest.js";
import DiaryTestSubmit from "./pages/Test/DiaryTestSubmit.js";
import DiaryTestResult from "./pages/Test/DiaryTestResult";
import Survey from "./pages/Survey/Survey.js";
import SurveyStart from "./pages/Survey/SurveyStart.js";
import DementiaCenter from "./pages/CenterPages/DementiaCenter.js";
import DiaryWrite from "./pages/Calendar/DiaryWrite.js";
import Error from "./pages/Test/Error.js";
import Surveyresult from "./pages/Survey/SurveyResult.js";
import BeforeGame from "./pages/gamePages/BeforeGame";
import Gymnastics from "./pages/Gym/Gymnastics";
import GymnasticsVideo from "./pages/Gym/GymnasticsVideo";
import MyPage from "./pages/MyPages/MyPage";
import CenterMap from "./pages/CenterPages/CenterMap";
import PrevSurveyResult from "./pages/Survey/PrevSurveyResult";
import SurveyError from "./pages/Survey/SurveyError";
import Header from "./component/Header";
import SubLayout from "./layout/SubLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAutoLogin from "./hooks/useAutoLogin";
import Explain from "./pages/Keyword/Explain.js";
import UserUpdate, {
  USER_UPDATE_PAGE_PATH,
} from "./pages/MyPages/UserUpdate.js";
import DiaryManagement, {
  DIARY_MANAGEMENT_PAGE_PATH,
} from "./pages/MyPages/DiaryManagement.js";
import HelpForAi from "./pages/ImageDiary/HelpForAi.js";
import ShowAiResult from "./pages/ImageDiary/ShowAiResult.js";
import Keyword from "./pages/Keyword/Keyword.js";
import {
  API_KEY_INPUT_PAGE_PATH,
  APIKeyInput,
} from "./pages/MyPages/APIKeyInput";
import useGetLocation from "./hooks/useGetLocation.js";

function App() {
  useGetLocation();
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
          <Route exact path={USER_UPDATE_PAGE_PATH} element={<UserUpdate />} />
          <Route
            exact
            path={DIARY_MANAGEMENT_PAGE_PATH}
            element={<DiaryManagement />}
          />
          <Route
            exact
            path={API_KEY_INPUT_PAGE_PATH}
            element={<APIKeyInput />}
          />
          <Route
            exact
            path={"/prevsurveyresult"}
            element={<PrevSurveyResult />}
          />
          <Route exact path={"/surveyerror"} element={<SurveyError />} />
          <Route exact path={"/draw/help"} element={<HelpForAi />} />
          <Route exact path={"/draw/help/result"} element={<ShowAiResult />} />
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
