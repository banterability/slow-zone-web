import { Link, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import nearbyStyles from "~/styles/nearby.css";
import stationStyles from "~/styles/stations.css";
import { StationListItem } from "./stations/index";

function LoadingState() {
  return (
    <div className="page__main">
      <p>Detecting your location…</p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="page__main">
      <p>Unable to get your current location.</p>
      <p>Make sure you have allowed Slow Zone access to your location data.</p>
    </div>
  );
}

function links() {
  return [
    { rel: "stylesheet", href: nearbyStyles },
    { rel: "stylesheet", href: stationStyles },
  ];
}

export default function Nearby() {
  const [errored, setErrored] = useState(false);
  const [located, setLocated] = useState(false);
  const [stations, setStations] = useState([]);
  const stationFetcher = useFetcher();

  const fetchStations = (lat: number, lng: number) => {
    const qs = new URLSearchParams();
    qs.set("lat", lat);
    qs.set("lng", lng);
    stationFetcher.load(`/nearby/stations?${qs.toString()}`);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("got location", position.coords);
        setErrored(false);
        setLocated(true);
        fetchStations(latitude, longitude);
      },
      (err) => {
        console.log("did not get location", err);
        setLocated(true);
        setErrored(true);
      },
      { enableHighAccuracy: true, timeout: 2500, maximumAge: 1000 * 30 }
    );
  };

  useEffect(() => {
    if (located) {
      console.log("do not try to find them again");
      return;
    }
    getLocation();
  }, []);

  return (
    <>
      <div className="page__header">
        <div className="nearby__header">
          <h3>Nearby Stations</h3>
          <div className="nearby__button">
            <button
              className="nearby-list__refresh"
              onClick={getLocation}
              disabled={stationFetcher.state !== "idle"}
            >
              Update Location
            </button>
          </div>
        </div>
      </div>

      {located ? (
        stationFetcher.data?.stations ? (
          <ul className="station-list">
            {stationFetcher.data?.stations.map((station) => {
              const { id, name, lines } = station;
              return (
                <StationListItem key={id} id={id} name={name} lines={lines} />
              );
            })}
          </ul>
        ) : (
          <ErrorState />
        )
      ) : (
        <LoadingState />
      )}

      <div className="page__footer">
        <Link to="/stations">View All Stations</Link>
      </div>
    </>
  );
}
