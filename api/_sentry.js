const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  release: process.env.REACT_APP_REVISION,
  environment: "server",
});
