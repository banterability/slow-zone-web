import { captureException } from "@sentry/react-router";
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

import type { Route } from "./+types/stations.$stationId";
import type { Arrival } from "slow-zone";

export async function loader({ params }: Route.LoaderArgs) {
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

  let arrivals: Arrival[] = [];
  try {
    arrivals = await client.getArrivalsForStation(stationId);
  } catch (error) {
    captureException(error, { extra: { stationId } });
  }

  return { station, arrivals };
}

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: `${data?.station?.name ?? "Station"} • Slow Zone`,
    },
  ];
};

export default function StationId({ loaderData }: Route.ComponentProps) {
  const { station, arrivals } = loaderData;
  const { name, id, lines } = station;

  const [favorite, setFavorite] = useState(false);

  function toggleFavorite() {
    if (favorite) {
      removeFavoriteStation(id);
    } else {
      addFavoriteStation(id, { lines, title: name, id });
    }
    setFavorite(!favorite);
  }
  // hydrate favorite & add to history in browser
  useEffect(() => {
    pushRecentStation(id, { lines, title: name, id });
    // Client-side hydration from localStorage — see useSyncExternalStore for a proper fix.
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setFavorite(isFavorite(id));
  }, [id, lines, name]);

  return (
    <>
      <div className="station-header">
        <div className="station-header-meta">
          <div className="station-header-favorite">
            <Star
              active={favorite}
              altTextActive="Remove Favorite"
              altTextInactive="Add Favorite"
              onClick={toggleFavorite}
            />
          </div>
          <h2 className="station-header-title">{name}</h2>
          <div className="station-header-lines">
            <Lines lines={lines} />
          </div>
        </div>

        <StaticMap stationId={station.id} />
      </div>

      <ArrivalList arrivals={arrivals} />
    </>
  );
}
