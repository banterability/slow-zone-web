import { getDistance, orderByDistance, convertDistance } from "geolib";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

import { STATION_LOCATIONS, ORDERED_STATIONS } from "~/data/stations";
import invariant from "tiny-invariant";

const findStation = (stationId: number) =>
  ORDERED_STATIONS.find((station) => station.id === stationId);

export async function loader({ request }: LoaderArgs) {
  let latitude, longitude, count;

  try {
    const url = new URL(request.url);
    const latStr = url.searchParams.get("lat");
    const longStr = url.searchParams.get("lng");
    const countStr = url.searchParams.get("count");

    invariant(latStr, "latitude is required");
    invariant(longStr, "longitude is required");

    latitude = parseFloat(latStr);
    longitude = parseFloat(longStr);
    count = countStr ? parseInt(countStr, 10) : 5;
  } catch {
    return new Response(null, { status: 400 });
  }

  const userLocation: { latitude: number; longitude: number } = {
    latitude,
    longitude,
  };

  const nearestStations = orderByDistance(userLocation, STATION_LOCATIONS)
    .slice(0, count)
    .map((result) => {
      const station = findStation(result.stationId);
      invariant(station);
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
