import React from "react";

import ArrivalListItem from "./ArrivalListItem";

class ArrivalList extends React.Component {
  filterChildProps(item) {
    return {
      destination: item.destination.name,
      etaString: item.prediction.arrivalString,
      etaMinutes: item.prediction.arrivalMinutes,
      approaching: item.status.approaching,
      delayed: item.status.delayed,
      scheduled: item.status.scheduled,
      line: item.route.class
    };
  }

  render() {
    return (
      <div>
        <h3>Arrivals</h3>
        <ul>
          {this.props.arrivals.map((arrival, index) =>
            <ArrivalListItem key={index} {...this.filterChildProps(arrival)} />
          )}
        </ul>
      </div>
    );
  }
}

export default ArrivalList;
