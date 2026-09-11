import { captureException } from "@sentry/react-router";

export function apiError(
  status: number,
  code: string,
  message: string,
  headers?: HeadersInit,
): Response {
  return Response.json({ error: { code, message } }, { status, headers });
}

/**
 * Maps a slow-zone failure to an API error response. slow-zone throws
 * `Error("[103] Invalid mapid: 99999")` for CTA error codes, so the code is the
 * bracketed prefix; anything else is a transport or parsing failure. Server-side
 * failures are reported to Sentry; not-found cases aren't, they're just noise.
 */
export function ctaErrorResponse(
  error: unknown,
  extra: Record<string, unknown>,
): Response {
  const message = error instanceof Error ? error.message : String(error);
  const code = /^\[(\d+)\]/.exec(message)?.[1];
  switch (code) {
    case "501":
      return apiError(404, "run_not_found", "No trains with that run number");
    case "103":
      return apiError(404, "station_not_found", "No station with that id");
    case undefined:
      captureException(error, { extra });
      return apiError(
        502,
        "upstream_unavailable",
        "The CTA Train Tracker API could not be reached",
      );
    default:
      captureException(error, { extra });
      return apiError(
        502,
        "upstream_error",
        "The CTA Train Tracker API returned an error",
      );
  }
}
