// @flow
import React from "react";

import Lines from "../../Components/Lines";
import StaticMap from "../../Components/StaticMap";
import type {Line as LineType} from "../../types";

import "../../css/StationHeader.css";

type Props = {
  name: string,
  latitude: number,
  longitude: number,
  lines: Array<LineType>
};

const StationHeader = ({name, latitude, longitude, lines}: Props) => (
  <div className="station-header">
    <div className="station-header--meta">
      <h2 className="station-header--name">{name}</h2>
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
