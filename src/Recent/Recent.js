// @flow
import React, {Fragment} from "react";

import StationListItem from "../Stations/StationList/StationListItem";
import {getRecentStations} from "../store/RecentStations";

import type {RecentStation} from "../types";

import "../Stations/StationList/StationList.css";

class Recent extends React.Component<{}> {
  render() {
    return (
      <Fragment>
        <h3>Recent Stations</h3>
        <ul className="station-list">
          {getRecentStations().map(
            ({pathname, title, lines}: RecentStation, index: number) => (
              <li key={index}>
                <StationListItem name={title} lines={lines} url={pathname} />
              </li>
            )
          )}
        </ul>
      </Fragment>
    );
  }
}

export default Recent;
