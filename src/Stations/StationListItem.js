import React from "react";
import {Link} from "react-router-dom";

import Lines from "./Lines";

import "./StationListItem.css";

class StationListItem extends React.Component {
  render() {
    const {id, name, lines, url} = this.props;

    return (
      <Link className="station-list__item" to={url ? url : `/stations/${id}`}>
        <p className="station-list__item__station-name">{name}</p>
        <div className="station-list__item__lines">
          <Lines lines={lines} />
        </div>
      </Link>
    );
  }
}

export default StationListItem;
