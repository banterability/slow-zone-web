// @flow
import React from "react";

import StationListItem from "../Stations/StationList/StationListItem";
import {getRecentStations} from "../store/RecentStations";
import type {RecentStation} from "../types";

import "../Stations/StationList/StationList.css";

class Recent extends React.Component<{}> {
  render() {
    return (
      <>
        <h3>Recent Stations</h3>
        <ul className="station-list" elementtiming="station-list">
          {getRecentStations().map(
            ({pathname, title, lines}: RecentStation, index: number) => (
              <li key={index}>
                <StationListItem name={title} lines={lines} url={pathname} />
              </li>
            )
          )}
        </ul>
      </>
    );
  }
}

export default Recent;
