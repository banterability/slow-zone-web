import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

import { StationListItem } from "~/components/StationListItem";
import nearbyStyles from "~/styles/nearby.css";
import stationStyles from "~/styles/stations.css";

import type { Station } from "~/types/station";

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
      <p>Unable to get your location.</p>
      <p>
        Make sure you have allowed access to your location data in your browser.
      </p>
    </div>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: nearbyStyles },
    { rel: "stylesheet", href: stationStyles },
  ];
}

export function meta() {
  return [{ title: "Nearby • Slow Zone" }];
}

export default function Nearby() {
  const [located, setLocated] = useState(false);
  const stationFetcher = useFetcher();

  const fetchStations = (lat: number, lng: number) => {
    const qs = new URLSearchParams();
    qs.set("lat", lat.toString());
    qs.set("lng", lng.toString());
    stationFetcher.load(`/nearby/stations?${qs.toString()}`);
  };

  function locationSuccess(position) {
    const { latitude, longitude } = position.coords;
    setLocated(true);
    fetchStations(latitude, longitude);
  }

  function locationError(error) {
    setLocated(true);
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
      enableHighAccuracy: true,
      timeout: 2500,
      maximumAge: 1000 * 30,
    });
  };

  useEffect(() => {
    if (located) {
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
            {stationFetcher.data?.stations.map((station: Station) => {
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
    </>
  );
}
