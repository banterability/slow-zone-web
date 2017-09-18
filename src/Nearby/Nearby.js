import React from "react";

import {StationRequest} from "../requests";
import StationListItem from "../Stations/StationListItem";

class Nearby extends React.Component {
  state = {
    loadingLocation: true,
    loadingStations: false,
    location: null,
    stations: []
  };

  componentDidMount() {
    this.fetchLocation().then(this.fetchNearbyStations);
  }

  fetchLocation = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({loadingLocation: false, location: position.coords});
          resolve();
        },
        err => reject(err),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000 * 60
        }
      );
    });

  fetchNearbyStations = () =>
    fetch(
      new StationRequest({
        url: `/nearby?lat=${this.state.location.latitude}&lng=${this.state
          .location.longitude}`
      })
    )
      .then(res => res.json())
      .then(json => json.stations)
      .then(stations => {
        this.setState({stations, loadingStations: false});
      });

  render() {
    return (
      <div>
        <h2>Nearby</h2>
        {this.state.locationLoading && <p>Loading location</p>}
        {this.state.stationsLoading && <p>Loading stations</p>}
        {this.state.stations && (
          <ul>
            {this.state.stations.map((station, index) => (
              <li key={index}>
                <StationListItem {...station} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Nearby;
