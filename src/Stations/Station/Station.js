// @flow
import React, {useState, useEffect} from "react";

import ArrivalListFetch from "../ArrivalList/ArrivalListFetch";
import {setDocumentTitle} from "../../lib/document";
import StationHeader from "./StationHeader";
import type {Station as StationType} from "../../types";
import {
  isFavorite,
  addFavoriteStation,
  removeFavoriteStation,
} from "../../store/FavoriteStations";

const Station = ({
  station: {
    id,
    name,
    description,
    location: {latitude, longitude},
    lines,
  },
}: {
  station: StationType,
}) => {
  const [favorite, setFavorite] = useState(isFavorite(id));

  useEffect(() => {
    setDocumentTitle(`${favorite ? "⭐️" : ""} ${description}`);
  });

  return (
    <>
      <StationHeader
        title={name}
        latitude={latitude}
        longitude={longitude}
        lines={lines}
        isFavorite={favorite}
        onToggleFavorite={() => {
          if (favorite) {
            removeFavoriteStation(id);
          } else {
            addFavoriteStation(id, {
              lines,
              title: name,
              pathname: window.location.pathname,
            });
          }
          setFavorite(!favorite);
        }}
      />
      <ArrivalListFetch stationId={id} />
    </>
  );
};

export default Station;
