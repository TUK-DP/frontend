import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import ImageDiary from "../modules/ImageDiary.js";
import uriSave from "../modules/uriSave.js";

const rootReducer = combineReducers({ ImageDiary, uriSave });
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
