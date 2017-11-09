/* @flow */

import React from "react";

import {StationRequest} from "../requests";
import StationListItem from "../Stations/StationListItem";
import type {Location, Station} from "../types";

type State = {
  loadingLocation: boolean,
  loadingStations: boolean,
  location: Location,
  stations: Array<Station>
};

class Nearby extends React.Component<{}, State> {
  state = {
    loadingLocation: true,
    loadingStations: false,
    location: {},
    stations: []
  };

  unmounted = false;

  componentDidMount() {
    this.fetchLocation().then(this.fetchNearbyStations);
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  fetchLocation = (): Promise<any> =>
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

  fetchNearbyStations = () => {
    const {location: {latitude, longitude}} = this.state;

    fetch(
      new StationRequest({
        url: `/nearby?lat=${latitude}&lng=${longitude}`
      })
    )
      .then(res => res.json())
      .then(json => json.stations)
      .then(stations => {
        if (this.unmounted) {
          return false;
        }
        this.setState({stations, loadingStations: false});
      });
  };

  render() {
    return (
      <div>
        <h2>Nearby</h2>
        {this.state.loadingLocation && <p>Loading location...</p>}
        {this.state.loadingStations && <p>Loading stations...</p>}
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
