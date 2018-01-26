import React from "react";
import unique from "array-unique";

import ArrivalListItem from "./ArrivalListItem";
import {DirectionFilter, LineFilter} from "./Filters";

import "./ArrivalList.css";

class ArrivalList extends React.Component {
  state = {
    filterByHeadsign: null,
    filterByLine: null
  };

  mounted = true;

  componentWillUnmount() {
    this.mouted = false;
  }

  filterChildProps(item) {
    return {
      destination: item.destination.name,
      etaString: item.prediction.arrivalString,
      etaMinutes: item.prediction.arrivalMinutes,
      approaching: item.status.approaching,
      delayed: item.status.delayed,
      scheduled: item.status.scheduled,
      line: item.route.class
    };
  }

  getAllDestinations() {
    return unique(
      this.props.arrivals.map(arrival => arrival.station.stop.description)
    );
  }

  getAllLines() {
    return unique(this.props.arrivals.map(arrival => arrival.route.name));
  }

  getAllHeadsigns() {
    return unique(this.props.arrivals.map(arrival => arrival.destination.name));
  }

  filteredArrivals() {
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

  clearFilterByLine = () => this.setState({filterByLine: null});
  filterByLine = line => this.setState({filterByLine: line});

  clearFilterByHeadsign = () => this.setState({filterByHeadsign: null});
  filterByHeadsign = headsign => {
    this.setState({filterByHeadsign: headsign});
  };

  render() {
    return (
      <div>
        <h3>Arrivals</h3>

        <div>
          <h4>Filters</h4>

          <LineFilter
            lines={this.getAllLines().map(line => line.toLowerCase())}
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
            <ArrivalListItem key={index} {...this.filterChildProps(arrival)} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ArrivalList;
