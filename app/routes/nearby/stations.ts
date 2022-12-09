import { getDistance, orderByDistance, convertDistance } from "geolib";
import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

import { STATION_LOCATIONS, ORDERED_STATIONS } from "~/data/stations";

const findStation = (stationId: number) =>
  ORDERED_STATIONS.find((station) => station.id === stationId);

export async function loader({ request }) {
  const url = new URL(request.url);
  const latitude = url.searchParams.get("lat");
  const longitude = url.searchParams.get("lng");
  const count = url.searchParams.get("count");

  if (!latitude && !longitude) {
    return new Response(null, { status: 400 });
  }

  const userLocation = {
    latitude,
    longitude,
  };

  const nearestStations = orderByDistance(userLocation, STATION_LOCATIONS)
    .slice(0, count || 5)
    .map((result) => {
      const station = findStation(result.stationId);
      const distance = getDistance(station.location, userLocation);

      return {
        ...station,
        distance: {
          feet: convertDistance(distance, "ft"),
          miles: convertDistance(distance, "mi"),
        },
      };
    });

  return json({ stations: nearestStations });
}
