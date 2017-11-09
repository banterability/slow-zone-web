import React from "react";

import {StationRequest} from "../requests";

import {LineFilter} from "./Filters";
import StationListItem from "./StationListItem";

import "./StationList.css";

class StationList extends React.Component {
  state = {
    loading: true,
    stations: [],
    filteredStations: []
  };

  fetchStations = () =>
    fetch(new StationRequest())
      .then(res => res.json())
      .then(json => json.stations)
      .then(stations =>
        this.setState({
          stations,
          filteredStations: stations,
          loading: false
        })
      );

  componentDidMount() {
    this.fetchStations();
  }

  clearFilterByLine = () => {
    this.setState({filteredStations: this.state.stations});
  };

  filterByLine = line => {
    this.setState({
      filteredStations: this.state.stations.filter(station =>
        station.lines.includes(line)
      )
    });
  };

  render() {
    return (
      <div>
        {this.state.loading && <p>Loading</p>}
        <LineFilter
          onReset={this.clearFilterByLine}
          onFilter={this.filterByLine}
        />
        <ul className="station-list">
          {this.state.filteredStations.map((station, index) => (
            <li key={index}>
              <StationListItem {...station} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default StationList;
