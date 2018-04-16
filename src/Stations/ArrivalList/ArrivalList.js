// @flow
import React, {Fragment} from "react";
import unique from "array-unique";

import ArrivalListItem from "./ArrivalListItem";
import {DirectionFilter, LineFilter} from "../Filters";

import type {Arrival as ArrivalType} from "../../types";

import "./ArrivalList.css";

type Props = {
  arrivals: Array<ArrivalType>
};

type State = {
  filterByHeadsign: ?string,
  filterByLine: ?string
};

class ArrivalList extends React.Component<Props, State> {
  state = {
    filterByHeadsign: null,
    filterByLine: null
  };

  mounted = true;

  componentWillUnmount() {
    this.mounted = false;
  }

  getAllLines(): Array<string> {
    return unique(
      this.props.arrivals.map(arrival => arrival.route.name.toLowerCase())
    );
  }

  getAllHeadsigns(): Array<string> {
    return unique(this.props.arrivals.map(arrival => arrival.destination.name));
  }

  filteredArrivals(): Array<ArrivalType> {
    let arrivals = this.props.arrivals;

    if (this.state.filterByLine) {
      arrivals = arrivals.filter(
        arrival => arrival.route.class === this.state.filterByLine
      );
    }

    if (this.state.filterByHeadsign) {
      arrivals = arrivals.filter(
        arrival => arrival.destination.name === this.state.filterByHeadsign
      );
    }

    return arrivals;
  }

  clearFilterByHeadsign = (): void => this.setState({filterByHeadsign: null});

  clearFilterByLine = (): void => this.setState({filterByLine: null});

  filterByHeadsign = (headsign: string): void =>
    this.setState({filterByHeadsign: headsign});

  filterByLine = (line: string): void => this.setState({filterByLine: line});

  render() {
    return (
      <Fragment>
        <h3>Arrivals</h3>

        <div>
          <h4>Filters</h4>

          <LineFilter
            lines={this.getAllLines()}
            onReset={this.clearFilterByLine}
            onFilter={this.filterByLine}
          />

          <DirectionFilter
            directions={this.getAllHeadsigns()}
            onReset={this.clearFilterByHeadsign}
            onFilter={this.filterByHeadsign}
          />
        </div>

        <ul className="arrival-list">
          {this.filteredArrivals().map((arrival, index) => (
            <ArrivalListItem key={index} {...arrival} />
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default ArrivalList;
