// @flow
import React from "react";

import LoadingBar from "../../Components/LoadingBar";
import FollowList from "./FollowList";
import {FollowRequest} from "../../requests";
import type {Arrival as ArrivalType} from "../../types";

type Props = {
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
    loading: true
  };

  componentDidMount() {
    this.fetchFollow();
  }

  fetchFollow() {
    fetch(new FollowRequest({runId: this.props.runId}))
      .then(res => res.json())
      .then(({data}: {data: Array<ArrivalType>}) => {
        if (data) {
          this.setState({
            arrivals: data,
            loading: false
          });
        } else {
          this.setState({
            errored: true,
            loading: false
          });
        }
      });
  }

  render() {
    return this.state.loading ? (
      <LoadingBar />
    ) : (
      <FollowList arrivals={this.state.arrivals} errored={this.state.errored} />
    );
  }
}

export default FollowListFetch;
