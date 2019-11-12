// @flow
import React from "react";

import Arrow from "../../Components/Arrow";
import FollowListFetch from "../FollowList/FollowListFetch";
import type {Arrival as ArrivalType} from "../../types";

import "../../css/ArrivalListItem.scss";

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
      route: {run},
      station: {
        stop: {id: stopId}
      }
    } = this.props;

    const {showNextStops} = this.state;

    return (
      <>
        <li
          className={`arrival-list-item cta-${this.props.route.class}`}
          onClick={this.toggleNextStops}
        >
          <span className="arrival-list-item__eta">{arrivalMinutes} m</span>
          <span className="arrival-list-item__headsign">{name}</span>
          <span className="arrival-list-item__time">
            {arrivalString.replace(/\s([ap])\.m\./, "$1")}
          </span>
          <span className="arrival-list-item__toggle-next-stops">
            <Arrow active={showNextStops} />
          </span>
        </li>
        {showNextStops ? (
          <FollowListFetch runId={run} currentStopId={stopId} />
        ) : null}
      </>
    );
  }
}

export default ArrivalListItem;
