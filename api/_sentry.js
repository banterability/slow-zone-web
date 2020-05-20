const Sentry = require("@sentry/node");

const Apm = require("@sentry/apm");

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  release: process.env.REACT_APP_REVISION,
  tracesSampleRate: 0.25,
  integrations: [new Sentry.Integrations.Http({tracing: true})],
});
