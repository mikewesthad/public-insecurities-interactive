import "./css/normalize.scss";
import "./css/style.scss";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.querySelector("#app")
);
