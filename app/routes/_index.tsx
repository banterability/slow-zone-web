import { useEffect, useState } from "react";

import { Star } from "~/components/icons/Star";
import { StationListItem } from "~/components/StationListItem";
import { getFavoriteStations } from "~/store/FavoriteStations";

import type { CachedStation } from "~/types/cache";

export const config = { runtime: "edge" };

export default function Index() {
  const [stations, setStations] = useState<CachedStation[]>([]);

  // hydrate favorites in browser
  useEffect(() => {
    setStations(getFavoriteStations());
  }, [setStations]);

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
