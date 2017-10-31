//@flow

import React from "react";
import classNames from "classnames";

import "./LineFilter.css";

type Props = {
  lines: Array<string>,
  onFilter: Function,
  onClearFilter: Function
};

type State = {
  activeLine: string
};

class LineFilter extends React.Component<Props, State> {
  state = {
    activeLine: ""
  };

  clearFilter = () => {
    this.setState({activeLine: ""}, () => this.props.onClearFilter());
  };

  handleFilter = (ev: SyntheticEvent<HTMLElement>) => {
    const line = ev.currentTarget.dataset.line;
    this.setState({activeLine: line}, () => this.props.onFilter(line));
  };

  render() {
    return (
      <div>
        <h3>Filter by Line</h3>
        <ul className="line-filter">
          {this.props.lines.map(line => (
            <li
              className={classNames("line-filter__line", `cta-${line}`, {
                "line-filter__line--active": this.state.activeLine === line
              })}
              data-line={line}
              key={line}
              onClick={this.handleFilter}
            />
          ))}
          <li>
            <button onClick={this.clearFilter}>Reset</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default LineFilter;
