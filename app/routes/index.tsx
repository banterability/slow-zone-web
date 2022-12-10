import { useEffect, useState } from "react";
import {
  getFavoriteStations,
  type RecentStation,
} from "~/store/FavoriteStations";
import { StationListItem } from "~/components/StationListItem";
import { Star } from "~/components/icons/Star";
import { Link } from "@remix-run/react";

export default function Index() {
  const [stations, setStations] = useState([]);

  // hydrate favorites in browser
  useEffect(() => {
    setStations(getFavoriteStations());
  }, []);

  return (
    <>
      <div className="page__header">
        <h3>Favorite Stations</h3>
      </div>
      {stations.length ? (
        <ul className="station-list">
          {stations.map(({ id, title, lines }: RecentStation) => (
            <StationListItem key={id} name={title} lines={lines} id={id} />
          ))}
        </ul>
      ) : (
        <div className="page__main">
          <p>You don't currently have any favorite stations.</p>
          <Star active={false} />
          <p>Add a station to your favorites from its detail page.</p>
        </div>
      )}

      <div className="page__footer">
        <Link to="/stations">View All Stations</Link>
      </div>
    </>
  );
}