import { createStore } from "redux";
import { combineReducers } from "redux";
import DiaryDate from "../modules/DiaryDate.js";
import DiaryInfo from "../modules/DiaryInfo.js";
import UserInfo from "../modules/UserInfo.js";
import PageName from "../modules/PageName.js";

const rootReducer = combineReducers({
  DiaryDate,
  DiaryInfo,
  UserInfo,
  PageName,
});
const store = createStore(rootReducer);

export default store;
