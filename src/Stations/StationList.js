// @flow
import React from "react";

import {LineFilter} from "./Filters";
import StationListItem from "./StationListItem";
import type {Line, Station} from "../types";

import "./StationList.css";

type Props = {
  stations: Array<Station>
};

type State = {
  filteredStations: Array<Station>
};

class StationList extends React.Component<Props, State> {
  state = {
    filteredStations: this.props.stations
  };

  componentWillReceiveProps(newProps: Props) {
    this.setState({filteredStations: newProps.stations});
  }

  clearFilterByLine = () => {
    this.setState({filteredStations: this.props.stations});
  };

  filterByLine = (line: Line) => {
    this.setState({
      filteredStations: this.props.stations.filter(station =>
        station.lines.includes(line)
      )
    });
  };

  render() {
    return (
      <div>
        <LineFilter
          onReset={this.clearFilterByLine}
          onFilter={this.filterByLine}
        />
        <ul className="station-list">
          {this.state.filteredStations.map((station: Station) => (
            <li key={station.id}>
              <StationListItem {...station} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default StationList;
