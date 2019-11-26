// @flow
import React from "react";

import "../css/Page.scss";

const ErrorState = () => (
  <div className="page__main">
    <p>Unable to get your current location.</p>
    <p>Make sure you have allowed Slow Zone access to your location data.</p>
  </div>
);

export default ErrorState;
