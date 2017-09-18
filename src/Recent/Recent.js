import React from "react";

import {getRecentStations} from "../store/MostRecentlyUsed";

import StationListItem from "../Stations/StationListItem";

class Recent extends React.Component {
  render() {
    const recentStations = getRecentStations();

    return (
      <div>
        <h3>Recent Stations</h3>
        <ul>
          {recentStations.map(({pathname, title, lines}, index) => (
            <li key={index}>
              <StationListItem name={title} lines={lines} url={pathname} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Recent;
