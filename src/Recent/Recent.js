// @flow

import React from "react";

import StationListItem from "../Stations/StationListItem";
import {getRecentStations} from "../store/RecentStations";
import type {RecentStation} from "../types";

class Recent extends React.Component<{}> {
  render() {
    return (
      <div>
        <h3>Recent Stations</h3>
        <ul>
          {getRecentStations().map(
            ({pathname, title, lines}: RecentStation, index: number) => (
              <li key={index}>
                <StationListItem name={title} lines={lines} url={pathname} />
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default Recent;
