import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import Pharma from "./Pharma.jsx";

// Check if StoreContextProvider is defined
console.log("StoreContextProvider:", StoreContextProvider);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <Pharma />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
