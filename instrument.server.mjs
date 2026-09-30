import * as Sentry from "@sentry/react-router";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://aabb17fa9d9d4ac4aa1193839af9fe74@o33492.ingest.us.sentry.io/4504314010730496",
  release: process.env.VERCEL_GIT_COMMIT_SHA,

  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  profileSessionSampleRate: 1.0,
  profileLifecycle: "trace",

  // Set up performance monitoring
  beforeSend(event) {
    // Filter out 404s from error reporting
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (
        error?.type === "NotFoundException" ||
        error?.value?.includes("404")
      ) {
        return null;
      }
    }
    return event;
  },
});
