import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { InternetIdentityProvider } from "ic-use-internet-identity";
import Actors from "./Actor";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InternetIdentityProvider>
      <Actors>
        <App />
      </Actors>
    </InternetIdentityProvider>
  </React.StrictMode>
);
