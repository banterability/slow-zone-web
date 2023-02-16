import { RemixServer } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { renderToString } from "react-dom/server";

import type { EntryContext } from "@remix-run/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1,
});

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
