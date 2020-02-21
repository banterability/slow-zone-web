// @flow
import React from "react";
import {Link} from "react-router-dom";

import {NearbyRequest} from "../requests";
import LoadingBar from "../Components/LoadingBar";
import {setDocumentTitle} from "../lib/document";
import StationList from "../Stations/StationList/StationList";
import type {Station as StationType} from "../types";
import ErrorState from "./ErrorState";

import "../css/Nearby.scss";
import "../css/Page.scss";

type State = {
  errorFetchingLocation: boolean,
  latitude: ?number,
  loading: boolean,
  longitude: ?number,
  stations: Array<StationType>
};

class Nearby extends React.Component<{}, State> {
  state = {
    errorFetchingLocation: false,
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
        err => {
          if (!this.unmounted) {
            this.setState({
              loading: false,
              errorFetchingLocation: true
            });
          }
          reject(err);
        },
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
        fetch(new NearbyRequest({latitude, longitude, count: 8}))
          .then(res => res.json())
          .then(json => json.data)
          .then(stations => {
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
    const {errorFetchingLocation, loading, stations} = this.state;

    return (
      <>
        <div className="page__header">
          <div className="nearby__header">
            <h3>Nearby Stations</h3>
            {!loading && (
              <div className="nearby__button">
                <button className="nearby-list__refresh" onClick={this.refresh}>
                  Update Location
                </button>
              </div>
            )}
          </div>
        </div>

        {loading && <LoadingBar />}

        {!loading &&
          (errorFetchingLocation ? (
            <ErrorState />
          ) : (
            <StationList stations={stations} showFilter={false} />
          ))}

        <div className="page__footer">
          <Link to="/stations">View All Stations</Link>
        </div>
      </>
    );
  }
}

export default Nearby;
