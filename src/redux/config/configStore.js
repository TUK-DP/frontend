import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import ex from "../modules/ex.js";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({ ex });
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
