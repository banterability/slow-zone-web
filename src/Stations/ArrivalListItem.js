import React from "react";
import PropTypes from "prop-types";

import Line from "./Line";

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
      <li>
        <Line line={this.props.line} />
        <span>{this.props.etaMinutes}m – </span>
        <span>{this.props.etaString} – </span>
        <span>
          {this.props.destination}
        </span>
        {this.props.approaching && "approaching!"}
        {this.props.scheduled && "scheduled!"}
        {this.props.delayed && "delayed!"}
      </li>
    );
  }
}

export default ArrivalListItem;
