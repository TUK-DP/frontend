import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./redux/config/configStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const render = () => {
  const state = store.getState();
  const fontSize = state.fontSize;

  document.getElementById("root").style.fontSize = fontSize;

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

render();
store.subscribe(render);
