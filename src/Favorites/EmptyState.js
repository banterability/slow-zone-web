// @flow
import React from "react";

import Star from "./Star";

import "../css/Page.scss";

const EmptyState = () => (
  <div className="page__main">
    <p>You don't currently have any favorite stations.</p>
    <Star active={false} />
    <p>Add a station to your favorites from its detail page.</p>
  </div>
);

export default EmptyState;
