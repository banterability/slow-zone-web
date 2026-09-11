import { captureException } from "@sentry/react-router";

import { apiError } from "./api-errors.server";

/**
 * slow-zone builds Dates from the CTA's zone-less Chicago wall-clock strings in
 * the process zone, so the API's timestamps are only right when the process runs
 * in America/Chicago (Vercel sets TZ). A loud failure beats times off by hours.
 */
export function requireChicagoTimeZone(): void {
  if (process.env.TZ !== "America/Chicago") {
    captureException(
      new Error(
        `TZ is ${JSON.stringify(process.env.TZ)}, expected America/Chicago`,
      ),
    );
    throw apiError(
      500,
      "misconfigured",
      "Server time zone is not America/Chicago",
    );
  }
}
