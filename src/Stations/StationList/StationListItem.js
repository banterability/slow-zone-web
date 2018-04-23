// @flow
import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

import Distance from "../../Components/Distance";
import Lines from "../Lines";

import type {Line as LineType, Distance as DistanceType} from "../../types";

import "./StationListItem.css";
import "../Lines.css";

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

    const multipleLines = lines.length !== 1;

    const classString = classNames("station-list__item", {
      [`cta-${lines[0]}`]: !multipleLines && lines[0],
      "cta-grey": multipleLines
    });

    return (
      <Link className={classString} to={this.stationUrl()}>
        <p className="station-list__item__station-name">{name}</p>
        {distance && (
          <div className="station-list__item__distance">
            <Distance feet={distance.feet} miles={distance.miles} />
          </div>
        )}
        {multipleLines && (
          <div className="station-list__item__lines">
            <Lines lines={lines} />
          </div>
        )}
      </Link>
    );
  }
}

export default StationListItem;
