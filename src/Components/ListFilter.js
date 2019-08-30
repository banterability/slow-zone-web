// @flow
import React from "react";
import classnames from "classnames";

import "./ListFilter.scss";

type Props = {
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  searchString: string
};

const ListFilter = ({searchString, onChange}: Props) => (
  <input
    className={classnames("list-filter", {
      "list-filter--active": searchString
    })}
    placeholder="🔍 Filter by Station Name"
    onChange={onChange}
    type="search"
    value={searchString}
  />
);

export default ListFilter;
