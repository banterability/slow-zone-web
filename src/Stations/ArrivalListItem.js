import React from "react";
import PropTypes from "prop-types";

import "./ArrivalListItem.css";

class ArrivalListItem extends React.Component {
  static propTypes = {
    destination: PropTypes.string.isRequired,
    etaString: PropTypes.string.isRequired,
    etaMinutes: PropTypes.number.isRequired,
    approaching: PropTypes.bool.isRequired,
    delayed: PropTypes.bool.isRequired,
    scheduled: PropTypes.bool.isRequired,
    line: PropTypes.string.isRequired
  };

  render() {
    return (
      <li className={`arrival-list-item cta-${this.props.line}`}>
        <span className="arrival--eta">{this.props.etaMinutes}m</span>
        <span className="arrival--headsign">{this.props.destination}</span>
        <span className="arrival--time">
          {this.props.etaString.replace(/\s([ap])\.m\./, "$1")}
        </span>

      </li>
    );
  }
}

export default ArrivalListItem;
