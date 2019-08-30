// @flow
import React from "react";
import {Link} from "react-router-dom";

import Distance from "../../Components/Distance";
import Lines from "../../Components/Lines";

import type {Line as LineType, Distance as DistanceType} from "../../types";

import "./StationListItem.css";

type Props = {
  distance?: DistanceType,
  lines: Array<LineType>,
  name: string,
  url: string
};

const StationListItem = ({name, lines, distance, url}: Props) => (
  <Link className="station-list__item" to={url}>
    <div>
      <p className="station-list__item__name">{name}</p>
      {distance && <Distance {...distance} />}
    </div>
    <Lines lines={lines} />
  </Link>
);

export default StationListItem;
