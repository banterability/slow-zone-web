// @flow
import React from "react";
import {Link} from "react-router-dom";

import Distance from "../Components/Distance";
import Lines from "./Lines";

import type {Station as StationType} from "../types";

import "./StationListItem.css";

class StationListItem extends React.Component<StationType> {
  render() {
    const {id, name, lines, url, distance} = this.props;

    return (
      <Link className="station-list__item" to={url ? url : `/stations/${id}`}>
        <p className="station-list__item__station-name">{name}</p>
        {distance && (
          <div className="station-list__item__distance">
            <Distance feet={distance.feet} miles={distance.miles} />
          </div>
        )}
        <div className="station-list__item__lines">
          <Lines lines={lines} />
        </div>
      </Link>
    );
  }
}

export default StationListItem;
