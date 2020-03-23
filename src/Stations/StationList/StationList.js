// @flow
import React from "react";

import ListFilter from "../../Components/ListFilter";
import StationListItem from "../../Components/StationListItem";

import type {Station as StationType} from "../../types";

import "../../css/StationList.scss";

type Props = {
  showFilter: boolean,
  stations: Array<StationType>,
};

type State = {
  filteredStations: Array<StationType>,
  searchString: string,
};

class StationList extends React.Component<Props, State> {
  state = {
    filteredStations: this.props.stations || [],
    searchString: "",
  };

  static defaultProps = {
    showFilter: true,
  };

  filterByText = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const searchString = ev.target.value;
    this.setState({
      filteredStations: this.props.stations.filter((station) =>
        station.name.toLowerCase().includes(searchString.toLowerCase())
      ),
      searchString,
    });
  };

  render() {
    return (
      <>
        {this.props.showFilter && (
          <ListFilter
            onChange={this.filterByText}
            searchString={this.state.searchString}
          />
        )}
        <ul className="station-list">
          {this.state.filteredStations.map((station: StationType) => (
            <li key={station.id}>
              <StationListItem
                name={station.name}
                url={`/stations/${station.id}`}
                lines={station.lines}
                distance={station.distance}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default StationList;
