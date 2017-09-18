import React from "react";
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";

import Stations from "./Stations/Stations";
import Home from "./Home/Home";
import Recent from "./Recent/Recent";
import Nearby from "./Nearby/Nearby";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header className="top-bar">
            <nav>
              <NavLink exact to="/">
                Home
              </NavLink>
              <NavLink to="/stations">Stations</NavLink>
              <NavLink to="/nearby">Nearby</NavLink>
              <NavLink to="/recent">Recent</NavLink>
            </nav>
          </header>

          <Route path="/" exact component={Home} />
          <Route path="/stations" component={Stations} />
          <Route path="/nearby" component={Nearby} />
          <Route path="/recent" component={Recent} />
        </div>
      </Router>
    );
  }
}

export default App;
