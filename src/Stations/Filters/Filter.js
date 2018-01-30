//@flow
import React from "react";
import classNames from "classnames";

import "./Filter.css";

type Props = {
  description: string,
  onFilter: Function,
  onReset: Function,
  options: Array<string>
};

type State = {
  activeFilter: ?string
};

class Filter extends React.Component<Props, State> {
  state = {activeFilter: null};

  clearFilter = () => {
    this.setState({activeFilter: ""}, () => this.props.onReset());
  };

  handleFilter = (ev: SyntheticEvent<HTMLElement>) => {
    const selectedFilter = ev.currentTarget.dataset.attr;
    this.setState({activeFilter: selectedFilter}, () =>
      this.props.onFilter(selectedFilter)
    );
  };

  render() {
    const {options, description} = this.props;
    const {activeFilter} = this.state;

    if (options.length < 2) {
      return null;
    }

    return (
      <div>
        <h3>{`Filter by ${description}`}</h3>

        <ul className="filter">
          {options.map(option => {
            const isActive = activeFilter === option;
            return (
              <li
                className={classNames(
                  "filter",
                  `filter--${description}`,
                  `filter--${description}--${option}`,
                  {
                    "filter--active": isActive,
                    [`filter--${description}--active`]: isActive,
                    [`filter--${description}--${option}--active`]: isActive
                  }
                )}
                data-attr={option}
                key={option}
                onClick={this.handleFilter}
              >
                {option}
              </li>
            );
          })}
          <li>
            <button onClick={this.clearFilter}>Reset</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Filter;
