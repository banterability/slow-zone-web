import { useLoaderData } from "@remix-run/react";

import { Star } from "~/components/icons/Star";
import { StationListItem } from "~/components/StationListItem";
import { getFavoriteStations } from "~/store/FavoriteStations";

export function clientLoader() {
  const stations = getFavoriteStations();
  return stations;
}

export function HydrateFallback() {
  return (
    <>
      <div className="page__header">
        <h3>Favorite Stations</h3>
      </div>
      <div className="page__main">
        <p>Loading...</p>
      </div>
    </>
  );
}
export default function Index() {
  const stations = useLoaderData<typeof clientLoader>();

  return (
    <>
      <div className="page__header">
        <h3>Favorite Stations</h3>
      </div>
      {stations.length ? (
        <ul className="station-list">
          {stations.map(({ id, title, lines }) => (
            <StationListItem key={id} name={title} lines={lines} id={id} />
          ))}
        </ul>
      ) : (
        <div className="page__main">
          <p>You don't have any favorite stations.</p>
          <Star active={false} />
          <p>Use the star on a station‘s page to add it to your favorites.</p>
        </div>
      )}
    </>
  );
}
