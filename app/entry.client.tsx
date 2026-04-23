import {
  init,
  reactRouterTracingIntegration,
  replayIntegration,
} from "@sentry/react-router";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

const tracing = reactRouterTracingIntegration({
  useInstrumentationAPI: true,
});

init({
  dsn: "https://aabb17fa9d9d4ac4aa1193839af9fe74@o33492.ingest.us.sentry.io/4504314010730496",
  sendDefaultPii: true,
  integrations: [tracing, replayIntegration()],
  enableLogs: true,
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^\//],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter
        unstable_instrumentations={[tracing.clientInstrumentation]}
      />
    </StrictMode>,
  );
});
