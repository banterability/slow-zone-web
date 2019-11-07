// @flow
import React from "react";
import {Link} from "react-router-dom";

import Distance from "./Distance";
import Lines from "./Lines";

import type {Line as LineType, Distance as DistanceType} from "../types";

import "../css/StationListItem.scss";

type Props = {
  distance?: DistanceType,
  lines: Array<LineType>,
  name: string,
  url: string
};

const StationListItem = ({distance, lines, name, url}: Props) => (
  <Link className="station-list__item" to={url}>
    <div>
      <p className="station-list__item__name">{name}</p>
      {distance && <Distance {...distance} />}
    </div>
    <Lines lines={lines} />
  </Link>
);

export default StationListItem;
