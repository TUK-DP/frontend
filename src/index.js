import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./redux/config/configStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
const render = () => {
  const state = store.getState();
  const fontSize = state.fontSize;

  document.documentElement.style.fontSize = fontSize;

  root.render(
    <RecoilRoot>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </RecoilRoot>
  );
};

render();
store.subscribe(render);
