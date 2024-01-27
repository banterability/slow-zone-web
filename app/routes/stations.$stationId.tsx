import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction, type MetaFunction } from "@vercel/remix";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";

import { ArrivalList } from "~/components/ArrivalList";
import { Star } from "~/components/icons/Star";
import { Lines } from "~/components/Lines";
import { StaticMap } from "~/components/StaticMap";
import { ORDERED_STATIONS } from "~/data/stations";
import {
  addFavoriteStation,
  isFavorite,
  removeFavoriteStation,
} from "~/store/FavoriteStations";
import { pushRecentStation } from "~/store/RecentStations";
import { client } from "~/util/slow-zone.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { stationId } = params;
  invariant(stationId, "stationId is required");
  const station = ORDERED_STATIONS.find(
    (station) => station.id === parseInt(stationId, 10),
  );
  if (!station) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const arrivals = await client.getArrivalsForStation(stationId);

  return json({ station, arrivals });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${data?.station?.name} • Slow Zone` || "Station • Slow Zone",
    },
  ];
};

export default function StationId() {
  const { station, arrivals } = useLoaderData<typeof loader>();
  const { name, id, lines } = station;

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
  }, [id, lines, name]);

  return (
    <>
      <div className="station-header">
        <div className="station-header--meta">
          <div className="station-header--favorite">
            <Star
              active={favorite}
              altTextActive="Remove Favorite"
              altTextInactive="Add Favorite"
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

        <StaticMap stationId={station.id} />
      </div>

      <ArrivalList arrivals={arrivals} />
    </>
  );
}
