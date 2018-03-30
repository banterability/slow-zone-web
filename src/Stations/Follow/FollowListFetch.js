// @flow
import React from "react";

import LoadingBar from "../../Components/LoadingBar";
import FollowList from "./FollowList";
import type {Arrival as ArrivalType} from "../../types";

type Props = {
  runId: number
};

type State = {
  arrivals: Array<ArrivalType>,
  loading: boolean
};

class FollowListFetch extends React.Component<Props, State> {
  state = {
    arrivals: [],
    loading: true
  };

  componentDidMount() {
    this.fetchFollow();
  }

  fetchFollow() {
    fetch(`https://api.slow.zone/follow/${this.props.runId}`)
      .then(res => res.json())
      .then(({data}: {data: Array<ArrivalType>}) => {
        this.setState({
          arrivals: data,
          loading: false
        });
      });
  }

  render() {
    return this.state.loading ? (
      <LoadingBar />
    ) : (
      <FollowList arrivals={this.state.arrivals} />
    );
  }
}

export default FollowListFetch;
