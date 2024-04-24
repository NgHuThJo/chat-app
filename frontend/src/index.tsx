// React
import React from "react";
// Third party
import ReactDOM from "react-dom/client";
// Contexts
import { ApiContextProvider } from "./utility/context/ApiContext.js";
import { LoginContextProvider } from "./utility/context/LoginContext.js";
// Components
import Router from "./pages/Router.js";
// Styles
import "./assets/styles/index.css";
import "./assets/styles/layout.css";
import "./assets/styles/box-model.css";
import "./assets/styles/typography.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiContextProvider>
      <LoginContextProvider>
        <Router />
      </LoginContextProvider>
    </ApiContextProvider>
  </React.StrictMode>
);
