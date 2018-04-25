// @flow
import React, {Fragment} from "react";
import {Link} from "react-router-dom";

import "./Home.css";

const Home = () => (
  <Fragment>
    <h2>Slow Zone</h2>

    <div className="home-buttons">
      <Link to="/stations">
        <button>All Stations</button>
      </Link>

      <Link to="/nearby">
        <button>Nearby Stations</button>
      </Link>

      <Link to="/recent">
        <button>Recently Viewed Stations</button>
      </Link>
    </div>
  </Fragment>
);

export default Home;
