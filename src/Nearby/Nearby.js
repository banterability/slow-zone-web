// @flow
import React from "react";

import {NearbyStationsRequest} from "../requests";
import LoadingBar from "../Components/LoadingBar";
import {setDocumentTitle} from "../lib/document";
import StationList from "../Stations/StationList/StationList";
import type {Station as StationType} from "../types";

import "../css/Nearby.scss";
import "../css/Page.scss";

type State = {
  latitude: ?number,
  loading: boolean,
  longitude: ?number,
  stations: Array<StationType>
};

class Nearby extends React.Component<{}, State> {
  state = {
    latitude: undefined,
    loading: false,
    longitude: undefined,
    stations: []
  };

  unmounted = false;

  componentDidMount() {
    this.refresh();
    setDocumentTitle("Nearby Stations");
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  fetchLocation = (): Promise<any> => {
    this.setState({loading: true});

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          if (!this.unmounted) {
            this.setState({loading: false, latitude, longitude});
          }
          resolve();
        },
        err => reject(err),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000 * 30
        }
      );
    });
  };

  fetchNearbyStations = () => {
    if (!this.unmounted) {
      this.setState({loading: true});

      const {latitude, longitude} = this.state;
      if (latitude && longitude) {
        fetch(new NearbyStationsRequest({latitude, longitude, limit: 6}))
          .then(res => res.json())
          .then(json => json.stations)
          .then(stations => {
            if (this.unmounted) {
              return false;
            }
            if (!this.unmounted) {
              this.setState({stations, loading: false});
            }
          });
      }
    }
  };

  refresh = () => {
    this.fetchLocation().then(this.fetchNearbyStations);
  };

  render() {
    return (
      <>
        <div className="nearby-list__header">
          <h2 className="nearby-list__title">Nearby</h2>
          {this.state.loading ? null : (
            <button className="nearby-list__refresh" onClick={this.refresh}>
              Update Location
            </button>
          )}
        </div>
        {this.state.loading && <LoadingBar />}
        {!this.state.loading && this.state.stations.length ? (
          <StationList stations={this.state.stations} showFilter={false} />
        ) : null}
      </>
    );
  }
}

export default Nearby;
