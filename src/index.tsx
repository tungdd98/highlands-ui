import React from "react";

// eslint-disable-next-line import/order
import i18next from "i18next";
import ReactDOM from "react-dom";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "redux/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import adminEn from "./translations/en/admin.json";
import clientEn from "./translations/en/client.json";
import adminVi from "./translations/vi/admin.json";
import clientVi from "./translations/vi/client.json";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  resources: {
    en: {
      admin: adminEn,
      client: clientEn,
    },
    vi: {
      admin: adminVi,
      client: clientVi,
    },
  },
  lng: "en",
  fallbackLng: "en",
});

ReactDOM.render(
  <Provider store={store} key="provider">
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
