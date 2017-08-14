import React from "react";
import {Link} from "react-router-dom";

import Lines from "./Lines";

class StationListItem extends React.Component {
  render() {
    const {id, name, lines, url} = this.props;

    return (
      <Link to={url ? url : `/stations/${id}`}>
        <p>{name}</p>
        <Lines lines={lines} />
      </Link>
    );
  }
}

export default StationListItem;
