// @flow
import React from "react";

import FollowListFetch from "../FollowList/FollowListFetch";
import type {Arrival as ArrivalType} from "../../types";

import "./ArrivalListItem.css";

type State = {
  showNextStops: boolean
};

class ArrivalListItem extends React.Component<ArrivalType, State> {
  state = {
    showNextStops: false
  };

  toggleNextStops = () =>
    this.setState({showNextStops: !this.state.showNextStops});

  render() {
    const {
      destination: {name},
      prediction: {arrivalString, arrivalMinutes},
      route: {run}
    } = this.props;

    return (
      <>
        <li
          className={`arrival-list-item cta-${this.props.route.class}`}
          onClick={this.toggleNextStops}
        >
          <span className="arrival--eta">{arrivalMinutes} m</span>
          <span className="arrival--headsign">{name}</span>
          <span className="arrival--time">
            {arrivalString.replace(/\s([ap])\.m\./, "$1")}
          </span>
        </li>
        {this.state.showNextStops ? <FollowListFetch runId={run} /> : null}
      </>
    );
  }
}

export default ArrivalListItem;
