import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from '@sentry/browser';

import {sentryDsn} from "../config";
import App from "./App";
import {unregister} from "./registerServiceWorker";

import "./index.css";

if (sentryDsn) {
  Sentry.init({dsn: sentryDsn});
}

ReactDOM.render(<App />, document.getElementById("root"));
unregister();
