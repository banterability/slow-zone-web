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
    loading: false
  };

  componentDidMount() {
    this.fetchFollow();
  }

  fetchFollow() {
    this.setState({loading: true});

    fetch(new FollowRequest(this.props.runId))
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
    const {arrivals, errored, loading} = this.state;

    return loading ? (
      <LoadingBar />
    ) : (
      <FollowList arrivals={arrivals} errored={errored} />
    );
  }
}

export default FollowListFetch;
