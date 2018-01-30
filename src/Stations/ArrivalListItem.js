// @flow
import React from "react";

import type {Arrival as ArrivalType} from "../types";

import "./ArrivalListItem.css";

class ArrivalListItem extends React.Component<ArrivalType> {
  render() {
    const {
      destination: {name},
      prediction: {arrivalString, arrivalMinutes}
    } = this.props;

    return (
      <li className={`arrival-list-item cta-${this.props.route.class}`}>
        <span className="arrival--eta">{arrivalMinutes}m</span>
        <span className="arrival--headsign">{name}</span>
        <span className="arrival--time">
          {arrivalString.replace(/\s([ap])\.m\./, "$1")}
        </span>
      </li>
    );
  }
}

export default ArrivalListItem;
