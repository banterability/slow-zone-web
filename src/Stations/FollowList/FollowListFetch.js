// @flow
import React from "react";

import LoadingBar from "../../Components/LoadingBar";
import FollowList from "./FollowList";
import {FollowRequest} from "../../requests";
import type {Arrival as ArrivalType} from "../../types";

type Props = {
  currentStopId: number,
  runId: number
};

type State = {
  arrivals: Array<ArrivalType>,
  errored: boolean,
  loading: boolean
};

class FollowListFetch extends React.Component<Props, State> {
  state = {
    arrivals: [],
    errored: false,
    loading: false
  };

  unmounted = false;

  componentDidMount() {
    this.fetchFollow();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  fetchFollow() {
    this.setState({loading: true});

    fetch(new FollowRequest(this.props.runId))
      .then(res => res.json())
      .then(({arrivals, error}: {data: Array<ArrivalType>, error: any}) => {
        if (!this.unmounted) {
          if (data) {
            this.setState({
              arrivals: arrivals,
              loading: false
            });
          } else {
            this.setState({
              errored: true,
              loading: false
            });
          }
        }
      });
  }

  render() {
    const {currentStopId} = this.props;
    const {arrivals, errored, loading} = this.state;

    return loading ? (
      <LoadingBar />
    ) : (
      <FollowList
        arrivals={arrivals}
        currentStopId={currentStopId}
        errored={errored}
      />
    );
  }
}

export default FollowListFetch;
