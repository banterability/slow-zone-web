import React from "react";
import unique from "array-unique";

import ArrivalListItem from "./ArrivalListItem";
import {LineFilter} from "./Filters";

import "./ArrivalList.css";

class ArrivalList extends React.Component {
  state = {
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

  filterByHeadsign() {}

  filteredArrivals() {
    let arrivals = this.props.arrivals;

    if (this.state.filterByLine) {
      arrivals = arrivals.filter(
        arrival => arrival.route.class === this.state.filterByLine
      );
    }

    return arrivals;
  }

  clearFilterByLine = () => this.setState({filterByLine: null});
  filterByLine = line => this.setState({filterByLine: line});

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
