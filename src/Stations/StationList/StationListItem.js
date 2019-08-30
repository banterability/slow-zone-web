// @flow
import React from "react";
import {Link} from "react-router-dom";

import Distance from "../../Components/Distance";

import Lines from "../Lines";
import type {Line as LineType, Distance as DistanceType} from "../../types";

import "./StationListItem.css";
import "../Lines.scss";

type Props = {
  distance?: DistanceType,
  id?: number,
  lines: Array<LineType>,
  name: string,
  url?: string
};

class StationListItem extends React.Component<Props> {
  stationUrl = () => {
    const {id, url} = this.props;

    if (url) return url;
    if (id) return `/stations/${id}`;
  };

  render() {
    const {name, lines, distance} = this.props;

    if (distance) {
      return (
        <Link className="station-list__item" to={this.stationUrl()}>
          <div>
            <p className="station-list__item__name">{name}</p>
            <Distance {...distance} />
          </div>
          <Lines lines={lines} />
        </Link>
      );
    } else {
      return (
        <Link className="station-list__item" to={this.stationUrl()}>
          <p className="station-list__item__name">{name}</p>
          <Lines lines={lines} />
        </Link>
      );
    }
  }
}

export default StationListItem;
