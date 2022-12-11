import { json, Response } from "@remix-run/node";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { StaticMap } from "~/components/StaticMap";
import { ORDERED_STATIONS } from "~/data/stations";
import { ArrivalList } from "~/components/ArrivalList";
import { Star } from "~/components/icons/Star";
import { useEffect, useState } from "react";

import invariant from "tiny-invariant";
import SlowZone from "~/util/slow-zone.server";
import { Lines } from "~/components/Lines";
import {
  addFavoriteStation,
  isFavorite,
  removeFavoriteStation,
} from "~/store/FavoriteStations";
import { pushRecentStation } from "~/store/RecentStations";

export const loader: LoaderFunction = async ({ params }) => {
  const { stationId } = params;
  invariant(stationId, "stationId is required");
  const station = ORDERED_STATIONS.find(
    (station) => station.id === parseInt(stationId, 10)
  );
  if (!station) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const client = new SlowZone({ apiKey: process.env.CTA_API_KEY });
  const arrivals = await client.getArrivalsForStation(stationId);

  return json({ station, arrivals });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return {
    title: data?.station?.name || "Station",
  };
};

export default function StationId() {
  const { station, arrivals } = useLoaderData();
  const { name, id, location, lines, accessible } = station;

  const { latitude, longitude } = location;

  const [favorite, setFavorite] = useState(false);

  function addFavorite() {
    addFavoriteStation(id, { lines, title: name, id });
  }
  function removeFavorite() {
    removeFavoriteStation(id);
  }
  // hydrate favorite & add to history in browser
  useEffect(() => {
    pushRecentStation(id, { lines, title: name, id });
    setFavorite(isFavorite(id));
  }, [setFavorite]);

  return (
    <>
      <div className="station-header">
        <div className="station-header--meta">
          <div className="station-header--favorite">
            <Star
              active={favorite}
              onClick={() => {
                favorite ? removeFavorite() : addFavorite();
                setFavorite(!favorite);
              }}
            />
          </div>
          <h2 className="station-header--title">{name}</h2>
          <div className="station-header--lines">
            <Lines lines={lines} />
          </div>
        </div>

        <StaticMap
          latitude={latitude}
          longitude={longitude}
          height={200}
          width={500}
        />
      </div>

      <ArrivalList arrivals={arrivals} />
    </>
  );
}
