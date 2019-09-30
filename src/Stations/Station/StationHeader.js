// @flow
import React from "react";

import Lines from "../../Components/Lines";
import StaticMap from "../../Components/StaticMap";
import type {Line as LineType} from "../../types";

import "../../css/StationHeader.scss";

type Props = {
  name: string,
  latitude: number,
  longitude: number,
  lines: Array<LineType>,
  isFavorite: boolean,
  onToggleFavorite: () => void
};

const StationHeader = ({
  name,
  latitude,
  longitude,
  lines,
  onToggleFavorite,
  isFavorite
}: Props) => (
  <div className="station-header">
    <div className="station-header--meta">
      <h2 className="station-header--name">{name}</h2>
      <div className="station-header--lines">
        <Lines lines={lines} />
      </div>
      <button onClick={onToggleFavorite}>
        {isFavorite ? "Remove Favorite" : "Make Favorite"}
      </button>
    </div>
    <StaticMap
      latitude={latitude}
      longitude={longitude}
      width={500}
      height={200}
    />
  </div>
);

export default StationHeader;
