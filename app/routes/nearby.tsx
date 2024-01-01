import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
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

export async function clientLoader() {
  console.log('inside client loader');
  function getLocation(options?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options))
  };

  let data;

  try {
    const position = await getLocation({
      enableHighAccuracy: true,
      timeout: 2500,
      maximumAge: 1000 * 30,
    });

    console.log('position', position);

    data = {
      location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }, error: null
    }

  } catch (e) {
    console.log('geolocation error', e);
    data = { location: null, error: e }
  }

  console.log('clientLoader returning', data);
  return data;
}

export function meta() {
  return [{ title: "Nearby • Slow Zone" }];
}

export default function Nearby() {
  const { location, error } = useLoaderData<typeof clientLoader>();
  const stationFetcher = useFetcher();
  const revalidator = useRevalidator();

  const fetchStations = (lat: number, lng: number) => {
    console.log('inside fetchStations');
    const qs = new URLSearchParams();
    qs.set("lat", lat.toString());
    qs.set("lng", lng.toString());
    stationFetcher.load(`/nearby/stations?${qs.toString()}`);
  };

  useEffect(() => {
    console.log('inside effect');
    if (error) {
      console.log('error getting location (effect)', error)
    }
    if (location) {
      console.log('got location (effect)', location);
      fetchStations(location.latitude, location.longitude);
    }
  }, [location, error]);

  return (
    <>
      <div className="page__header">
        <div className="nearby__header">
          <h3>Nearby Stations</h3>
          <div className="nearby__button">
            <button
              className="nearby-list__refresh"
              onClick={() => revalidator.revalidate()}
              disabled={stationFetcher.state !== "idle"}
            >
              Update Location
            </button>
          </div>
        </div>
      </div>

      {stationFetcher.data ? (
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
