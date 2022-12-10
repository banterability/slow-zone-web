import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getRecentStations } from "~/store/RecentStations";
import { StationListItem } from "~/components/StationListItem";

function EmptyState() {
  return (
    <div className="page__main">
      <p>You don't currently have any recent stations.</p>
      <p>
        Visit any station's page and it will automatically appear in this list.
      </p>
    </div>
  );
}
export default function Recent() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    setStations(getRecentStations());
  }, []);

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

      <div className="page__footer">
        <Link to="/stations">View All Stations</Link>
      </div>
    </>
  );
}