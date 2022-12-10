import { getDistance, orderByDistance, convertDistance } from "geolib";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

import { STATION_LOCATIONS, ORDERED_STATIONS } from "~/data/stations";

const findStation = (stationId: number) =>
  ORDERED_STATIONS.find((station) => station.id === stationId);

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const latitude = url.searchParams.get("lat");
  const longitude = url.searchParams.get("lng");

  if (!latitude && !longitude) {
    return new Response(null, { status: 400 });
  }

  let countStr = url.searchParams.get("count");
  let count = countStr ? parseInt(countStr, 10) : 5;

  const userLocation = {
    latitude,
    longitude,
  };

  const nearestStations = orderByDistance(userLocation, STATION_LOCATIONS)
    .slice(0, count)
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
