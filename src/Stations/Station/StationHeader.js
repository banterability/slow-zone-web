// @flow
import React from "react";

import Lines from "../../Components/Lines";
import StaticMap from "../../Components/StaticMap";
import type {Line as LineType} from "../../types";
import Star from "../../Favorites/Star";

import "../../css/StationHeader.scss";

type Props = {
  title: string,
  latitude: number,
  longitude: number,
  lines: Array<LineType>,
  isFavorite: boolean,
  onToggleFavorite: () => void
};

const StationHeader = ({
  title,
  latitude,
  longitude,
  lines,
  onToggleFavorite,
  isFavorite
}: Props) => (
  <div className="station-header">
    <div className="station-header--meta">
      <div className="station-header--favorite">
        <Star active={isFavorite} onClick={onToggleFavorite} />
      </div>
      <h2 className="station-header--title">{title}</h2>
      <div className="station-header--lines">
        <Lines lines={lines} />
      </div>
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
