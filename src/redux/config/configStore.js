import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import ImageDiary from "../modules/ImageDiary.js";
import urlSave from "../modules/urlSave.js";
import DiaryDate from "../modules/DiaryDate.js";

const rootReducer = combineReducers({ ImageDiary, urlSave, DiaryDate });
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
