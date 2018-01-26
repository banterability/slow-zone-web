import React from "react";

import {StationRequest} from "../requests";

import LoadingBar from "../Components/LoadingBar";
import StationList from "./StationList";

class StationListFetch extends React.Component {
  state = {
    loading: true,
    stations: []
  };

  fetchStations = () =>
    fetch(new StationRequest())
      .then(res => res.json())
      .then(json => json.stations)
      .then(stations =>
        this.setState({
          stations,
          loading: false
        })
      );

  componentDidMount() {
    this.fetchStations();
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <LoadingBar />
        ) : (
          <StationList stations={this.state.stations} />
        )}
      </div>
    );
  }
}

export default StationListFetch;
