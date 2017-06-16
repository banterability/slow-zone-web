import React from "react";

import {StationRequest} from "../requests";
import Station from "./Station";

class Stations extends React.Component {
  state = {
    loading: true,
    stations: []
  };

  fetchStations = () =>
    fetch(new StationRequest())
      .then(res => res.json())
      .then(json => json.data)
      .then(stations => this.setState({stations, loading: false}));

  componentDidMount() {
    this.fetchStations();
  }

  render() {
    return (
      <div>
        <h2>Stations</h2>
        {this.state.loading && <p>Loading</p>}
        <ul>
          {this.state.stations.map((station, index) =>
            <li key={index}><Station {...station} /></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Stations;
