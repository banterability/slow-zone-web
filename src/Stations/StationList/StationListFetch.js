// @flow
import React from "react";

import {StationsRequest} from "../../requests";
import LoadingBar from "../../Components/LoadingBar";
import StationList from "./StationList";
import type {Station as StationType} from "../../types";

type State = {
  loading: boolean,
  stations: Array<StationType>
};

class StationListFetch extends React.Component<{}, State> {
  state = {
    loading: true,
    stations: []
  };

  unmounted = false;

  componentWillUnmount() {
    this.unmounted = true;
  }

  fetchStations = (): void => {
    this.setState({loading: true});

    fetch(new StationsRequest())
      .then(res => res.json())
      .then(json => json.stations)
      .then((stations: Array<StationType>) => {
        if (!this.unmounted) {
          this.setState({
            stations,
            loading: false
          });
        }
      });
  };

  componentDidMount() {
    this.fetchStations();
  }

  render() {
    return this.state.loading ? (
      <LoadingBar />
    ) : (
      <StationList stations={this.state.stations} />
    );
  }
}

export default StationListFetch;
