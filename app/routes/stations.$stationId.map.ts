import { cacheHeader } from "pretty-cache-header";

import { STATION_LOCATIONS } from "~/data/stations";

import type { LoaderFunction } from "@remix-run/node";

type QueryStringArgs = {
  width: number;
  height: number;
  latitude: number;
  longitude: number;
  scale: number;
  zoom: number;
  key: string;
};

function notFound() {
  throw new Response("Not Found", {
    status: 404,
  });
}

function buildQueryString({
  height,
  latitude,
  longitude,
  width,
  ...rest
}: QueryStringArgs) {
  const LATITUDE_OFFSET = 0.0005;

  const params = new URLSearchParams();

  Object.entries(rest).forEach(([key, value]) => {
    params.append(key, value.toString());
  });
  params.append("size", `${width}x${height}`);
  params.append("center", `${latitude + LATITUDE_OFFSET},${longitude}`);

  return params.toString();
}

export const loader: LoaderFunction = async ({ params }) => {
  const { stationId } = params;
  if (!stationId) return notFound();

  const station = STATION_LOCATIONS.find(
    (station) => station.stationId === parseInt(stationId, 10),
  );
  if (!station) return notFound();

  const { latitude, longitude } = station;
  const query = buildQueryString({
    height: 200,
    key: process.env.GOOGLE_MAPS_STATIC_API_KEY,
    latitude,
    longitude,
    scale: 2,
    width: 500,
    zoom: 16,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/staticmap?${query}`,
  );

  return new Response(res.body, {
    status: 200,
    headers: {
      "Cache-Control": cacheHeader({
        public: true,
        sMaxage: "5m",
        staleWhileRevalidate: "15m",
      }),
      "Content-Type": "image/png",
    },
  });
};
