import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import reducer from "./Redux/Reducer.js";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";

//***CSS
//Bootstrap
import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import "./index.css";

//Redux create store
const store = createStore(
  reducer,
  devToolsEnhancer()
);

//Note that BrowerRouter wrapper is necessary to use react router components in App.js
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
