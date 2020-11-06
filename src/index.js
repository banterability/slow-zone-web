import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";

import App from "./App";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: process.env.REACT_APP_REVISION,
    environment: "client",
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
