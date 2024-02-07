import { createStore } from "redux";
import { combineReducers } from "redux";
import ex from "../modules/ex.js";

const rootReducer = combineReducers({ ex });
const store = createStore(rootReducer);

export default store;
