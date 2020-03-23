// @flow

import React from "react";

import "../../css/ArrivalListSectionHeader.scss";

type Props = {
  title: string,
};

const ArrivalListSectionHeader = ({title}: Props) => (
  <li className="arrival-list__section-header">{title}</li>
);

export default ArrivalListSectionHeader;
