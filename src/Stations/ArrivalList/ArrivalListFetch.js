// @flow
import React from "react";

import LoadingBar from "../../Components/LoadingBar";
import {StationArrivalsRequest} from "../../requests";
import ArrivalList from "./ArrivalList";
import type {Arrival as ArrivalType} from "../../types";

type Props = {
  stationId: number,
};

type State = {
  loading: boolean,
  arrivals: Array<ArrivalType>,
};

class ArrivalListFetch extends React.Component<Props, State> {
  state = {
    loading: false,
    arrivals: [],
  };

  unmounted = false;

  fetchArrivals = () => {
    this.setState({loading: true});

    const stationId = this.props.stationId;

    fetch(new StationArrivalsRequest(stationId))
      .then((res) => res.json())
      .then((json) => json.data)
      .then((arrivals: Array<ArrivalType>) => {
        if (!this.unmounted) {
          this.setState({arrivals, loading: false});
        }
      });
  };

  componentDidMount() {
    this.fetchArrivals();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const {arrivals, loading} = this.state;

    if (loading) {
      return <LoadingBar />;
    } else if (arrivals) {
      return (
        <ArrivalList
          arrivals={arrivals}
          loading={loading}
          refresh={this.fetchArrivals}
        />
      );
    } else {
      return null;
    }
  }
}

export default ArrivalListFetch;
