import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import StoreContextProvider from "./context/StoreContext";
import "antd/dist/antd.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StoreContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
