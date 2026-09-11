import { ORDERED_STATIONS } from "~/data/stations";
import { apiError, ctaErrorResponse } from "~/util/api-errors.server";
import { requireAppSecret } from "~/util/app-auth.server";
import { client } from "~/util/slow-zone.server";

import type { Route } from "./+types/api.v1.stations_.$stationId.arrivals";

export async function loader({ request, params }: Route.LoaderArgs) {
  requireAppSecret(request);

  const { stationId } = params;
  const station = /^\d+$/.test(stationId)
    ? ORDERED_STATIONS.find((station) => station.id === parseInt(stationId, 10))
    : undefined;
  if (!station) {
    return apiError(404, "station_not_found", "No station with that id");
  }

  try {
    const arrivals = await client.getArrivalsForStation(station.id);
    return Response.json(
      { arrivals, fetchedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return ctaErrorResponse(error, { stationId });
  }
}
