// @flow
import React, {Fragment} from "react";

import {LineFilter} from "../Filters";
import StationListItem from "./StationListItem";

import type {Line as LineType, Station as StationType} from "../../types";

import "./StationList.css";

type Props = {
  stations: Array<StationType>
};

type State = {
  filteredStations: Array<StationType>
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

  filterByLine = (line: LineType) => {
    this.setState({
      filteredStations: this.props.stations.filter(station =>
        station.lines.includes(line)
      )
    });
  };

  render() {
    return (
      <Fragment>
        <LineFilter
          onReset={this.clearFilterByLine}
          onFilter={this.filterByLine}
        />
        <ul className="station-list">
          {this.state.filteredStations.map((station: StationType) => (
            <li key={station.id}>
              <StationListItem
                name={station.name}
                id={station.id}
                lines={station.lines}
              />
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default StationList;
