import { apiError, ctaErrorResponse } from "~/util/api-errors.server";
import { requireAppSecret } from "~/util/app-auth.server";
import { client } from "~/util/slow-zone.server";

import type { Route } from "./+types/api.v1.runs.$runNumber";

export async function loader({ request, params }: Route.LoaderArgs) {
  requireAppSecret(request);

  const { runNumber } = params;
  if (!/^\d+$/.test(runNumber) || parseInt(runNumber, 10) === 0) {
    return apiError(
      400,
      "invalid_run",
      "Run number must be a positive integer",
    );
  }

  try {
    const arrivals = await client.followTrain(runNumber);
    return Response.json(
      { arrivals, fetchedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return ctaErrorResponse(error, { runNumber });
  }
}
