import { StationListItem } from "~/components/StationListItem";
import { getRecentStations } from "~/store/RecentStations";

import type { Route } from "./+types/recent";

function EmptyState() {
  return (
    <div className="page-main">
      <p>You don't have any recent stations.</p>
      <p>
        Visit any station‘s page and it will automatically appear in this list.
      </p>
    </div>
  );
}

export function meta() {
  return [
    {
      title: "Recents • Slow Zone",
    },
  ];
}

export function clientLoader({ request }: Route.ClientLoaderArgs) {
  const stations = getRecentStations();
  return stations;
}

export function HydrateFallback() {
  return (
    <>
      <div className="page-header">
        <h3>Recent Stations</h3>
      </div>
      <div className="page-main">
        <p>Loading...</p>
      </div>
    </>
  );
}

export default function Recent({ loaderData: stations }: Route.ComponentProps) {
  return (
    <>
      <div className="page-header">
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
