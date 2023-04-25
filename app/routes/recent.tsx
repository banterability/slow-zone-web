import { useEffect, useState } from "react";

import { StationListItem } from "~/components/StationListItem";
import { getRecentStations } from "~/store/RecentStations";

import type { CachedStation } from "~/types/cache";

function EmptyState() {
  return (
    <div className="page__main">
      <p>You don't have any recent stations.</p>
      <p>
        Visit any station‘s page and it will automatically appear in this list.
      </p>
    </div>
  );
}

export const config = { runtime: "edge" };

export function meta() {
  return [{
    title: "Recents • Slow Zone",
  }];
}

export default function Recent() {
  const [stations, setStations] = useState<CachedStation[]>([]);

  useEffect(() => {
    const recentStations = getRecentStations();
    setStations(recentStations);
  }, [setStations]);

  return (
    <>
      <div className="page__header">
        <h3>Recent Stations</h3>
      </div>

      {stations.length ? (
        <ul className="station-list">
          {stations.map(({ id, title, lines }) => (
            <StationListItem key={id} name={title} lines={lines} id={id} />
          ))}
        </ul>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
