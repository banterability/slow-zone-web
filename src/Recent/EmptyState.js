// @flow
import React from "react";

import "../css/Page.scss";

const EmptyState = () => (
  <div className="page__main">
    <p>You don't currently have any recent stations.</p>
    <p>
      Visit any station's page and it will automatically appear in this list.
    </p>
  </div>
);

export default EmptyState;
