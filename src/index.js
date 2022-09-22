import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import App from "./App";
import AlertTemplate from "./components/Alert/AlertTemplate";
import { CookiesProvider } from "react-cookie";

//カスタムアラートの表示設定
const options = {
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
  timeout: 1500,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
