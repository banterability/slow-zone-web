import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import {Integrations as ApmIntegrations} from "@sentry/apm";

import App from "./App";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: process.env.REACT_APP_REVISION,
    integrations: [new ApmIntegrations.Tracing()],
    tracesSampleRate: 0.25,
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
