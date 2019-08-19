// @flow
import React from "react";
import classnames from "classnames";

import StationListItem from "./StationListItem";
import type {Station as StationType} from "../../types";

import "./StationList.css";

type Props = {
  stations: Array<StationType>
};

type State = {
  filteredStations: Array<StationType>,
  searchString: string
};

class StationList extends React.Component<Props, State> {
  state = {
    filteredStations: this.props.stations,
    searchString: ""
  };

  componentWillReceiveProps(newProps: Props) {
    this.setState({filteredStations: newProps.stations});
  }

  filterByText = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const searchString = ev.target.value;
    this.setState({
      filteredStations: this.props.stations.filter(station =>
        station.name.toLowerCase().includes(searchString.toLowerCase())
      ),
      searchString
    });
  };

  render() {
    return (
      <>
        <input
          className={classnames("station-list__text-filter", {
            "station-list__text-filter--active": this.state.searchString
          })}
          placeholder="🔍 Filter by Station Name"
          onChange={this.filterByText}
          type="search"
          value={this.state.searchString}
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
      </>
    );
  }
}

export default StationList;
