// @flow
import React, {Fragment} from "react";

import {StationRequest} from "../requests";
import StationList from "../Stations/StationList";
import type {Station as StationType} from "../types";

type State = {
  latitude: ?number,
  loadingLocation: boolean,
  loadingStations: boolean,
  longitude: ?number,
  stations: Array<StationType>
};

class Nearby extends React.Component<{}, State> {
  state = {
    latitude: undefined,
    loadingLocation: true,
    loadingStations: false,
    longitude: undefined,
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
          const {latitude, longitude} = position.coords;
          this.setState({loadingLocation: false, latitude, longitude});
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
    const {latitude, longitude} = this.state;
    if (latitude && longitude) {
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
    }
  };

  render() {
    return (
      <Fragment>
        <h2>Nearby</h2>
        {this.state.loadingLocation && <p>Loading location...</p>}
        {this.state.loadingStations && <p>Loading stations...</p>}
        {this.state.stations.length ? (
          <StationList stations={this.state.stations} />
        ) : null}
      </Fragment>
    );
  }
}

export default Nearby;
