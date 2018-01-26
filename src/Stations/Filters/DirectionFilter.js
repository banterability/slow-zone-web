//@flow
import React from "react";

import Filter from "./Filter";
import "./DirectionFilter.css";

type Props = {
  description: string,
  directions: Array<string>,
  onFilter: Function,
  onReset: Function
};

class DirectionFilter extends React.Component<Props> {
  render() {
    return (
      <Filter
        description="Direction"
        options={this.props.directions}
        onFilter={this.props.onFilter}
        onReset={this.props.onReset}
      />
    );
  }
}

export default DirectionFilter;
