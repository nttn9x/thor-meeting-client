import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import ThemeContext from "@thor/context/use-theme.context";

import store from "./store";

import "./i18n";

import { App } from "./app.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContext>
        <App />
      </ThemeContext>
    </Provider>
  </React.StrictMode>
);
