import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AlertTemplate from "./components/Alert/AlertTemplate";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
  timeout: 1500,
};
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);
