// @flow
import React from "react";
import {NavLink} from "react-router-dom";

import "./Header.scss";

const Header = () => (
  <header className="header">
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/stations">Stations</NavLink>
      <NavLink to="/nearby">Nearby</NavLink>
      <NavLink to="/recent">Recent</NavLink>
    </nav>
  </header>
);

export default Header;
