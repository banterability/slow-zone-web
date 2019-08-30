// @flow
import React from "react";
import {Link} from "react-router-dom";

import "../css/Home.scss";

const Home = () => (
  <>
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
  </>
);

export default Home;
