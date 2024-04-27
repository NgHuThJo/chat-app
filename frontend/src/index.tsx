// React
import React from "react";
// Third party
import ReactDOM from "react-dom/client";
// Contexts
import { ApiContextProvider } from "./utility/context/ApiContext.js";
import { AuthContextProvider } from "./utility/context/AuthContext.js";
// Components
import Router from "./pages/Router.js";
// Styles
import "./assets/styles/index.css";
import "./assets/styles/layout.css";
import "./assets/styles/box-model.css";
import "./assets/styles/typography.css";

// ApiContextProvider needs to be top-level because other contexts rely on it
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiContextProvider>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ApiContextProvider>
  </React.StrictMode>
);
